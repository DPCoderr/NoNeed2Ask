using System.Net;
using System.Net.Http.Json;
using System.Text.Json;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using NoNeed2Ask.Api.Domain.Entities;
using NoNeed2Ask.Api.Tests.Support;

namespace NoNeed2Ask.Api.Tests;

public sealed class ApplicationIntegrationTests(ApiFactory factory) : IClassFixture<ApiFactory>
{
    [Theory]
    [InlineData("GET")]
    [InlineData("POST")]
    [InlineData("PUT")]
    [InlineData("DELETE")]
    public async Task Applications_ReturnUnauthorized_WhenUnauthenticated(string method)
    {
        var client = factory.CreateCookieClient();
        var id = Guid.NewGuid();

        var request = method switch
        {
            "GET" => new HttpRequestMessage(HttpMethod.Get, "/applications/"),
            "POST" => new HttpRequestMessage(HttpMethod.Post, "/applications/")
            {
                Content = JsonContent.Create(ApiTestHelpers.ValidApplicationRequest())
            },
            "PUT" => new HttpRequestMessage(HttpMethod.Put, $"/applications/{id}")
            {
                Content = JsonContent.Create(ApiTestHelpers.ValidApplicationRequest())
            },
            "DELETE" => new HttpRequestMessage(HttpMethod.Delete, $"/applications/{id}"),
            _ => throw new InvalidOperationException($"Unsupported method {method}.")
        };

        var response = await client.SendAsync(request);

        response.StatusCode.Should().Be(HttpStatusCode.Unauthorized);
    }

    [Fact]
    public async Task Create_ReturnsCreatedAndPersistsAllFields_WhenRequestIsValid()
    {
        var user = await factory.RegisterUserAsync();
        var request = ApiTestHelpers.ValidApplicationRequest(
            companyName: "Contoso",
            jobTitle: "Backend Engineer",
            status: ApplicationStatuses.InterviewPlanned,
            publicNote: "Interview scheduled",
            privateNote: "Ask about platform ownership",
            lastContactAt: new DateTimeOffset(2026, 06, 02, 8, 30, 0, TimeSpan.Zero),
            nextActionAt: new DateTimeOffset(2026, 06, 09, 8, 30, 0, TimeSpan.Zero));

        var response = await user.Client.PostAsJsonAsync("/applications/", request);

        response.StatusCode.Should().Be(HttpStatusCode.Created);
        response.Headers.Location.Should().NotBeNull();

        var created = await response.Content.ReadFromJsonAsync<TestApplicationResponse>();
        created.Should().NotBeNull();
        created!.Id.Should().NotBeEmpty();
        response.Headers.Location!.ToString().Should().Contain(created.Id.ToString());
        created.CompanyName.Should().Be(request.CompanyName);
        created.JobTitle.Should().Be(request.JobTitle);
        created.Status.Should().Be(request.Status);
        created.PublicNote.Should().Be(request.PublicNote);
        created.PrivateNote.Should().Be(request.PrivateNote);
        created.LastContactAt.Should().Be(request.LastContactAt);
        created.NextActionAt.Should().Be(request.NextActionAt);

        var getResponse = await user.Client.GetAsync($"/applications/{created.Id}");
        getResponse.StatusCode.Should().Be(HttpStatusCode.OK);
        var persisted = await getResponse.Content.ReadFromJsonAsync<TestApplicationResponse>();
        persisted.Should().BeEquivalentTo(created);
    }

    [Fact]
    public async Task Create_AllowsNullableOptionalFields()
    {
        var user = await factory.RegisterUserAsync();
        var request = new TestApplicationRequest(
            "Acme",
            "Software Engineer",
            ApplicationStatuses.Applied,
            PublicNote: null,
            PrivateNote: null,
            LastContactAt: null,
            NextActionAt: null);

        var created = await user.Client.CreateApplicationAsync(request);

        created.PublicNote.Should().BeNull();
        created.PrivateNote.Should().BeNull();
        created.LastContactAt.Should().BeNull();
        created.NextActionAt.Should().BeNull();
    }

    [Theory]
    [MemberData(nameof(InvalidApplicationRequests))]
    public async Task Create_ReturnsValidationProblem_WhenRequestIsInvalid(
        TestApplicationRequest request,
        string expectedErrorKey)
    {
        var user = await factory.RegisterUserAsync();

        var response = await user.Client.PostAsJsonAsync("/applications/", request);

        response.StatusCode.Should().Be(HttpStatusCode.BadRequest);
        var problem = await response.Content.ReadFromJsonAsync<ValidationProblemDetails>();
        problem.Should().NotBeNull();
        problem!.Errors.Should().ContainKey(expectedErrorKey);
    }

    [Fact]
    public async Task List_ReturnsEmptyArray_ForNewUser()
    {
        var user = await factory.RegisterUserAsync();

        var response = await user.Client.GetAsync("/applications/");

        response.StatusCode.Should().Be(HttpStatusCode.OK);
        var applications = await response.Content.ReadFromJsonAsync<TestApplicationListResponse>();
        applications.Should().NotBeNull();
        applications!.Items.Should().BeEmpty();
        applications.Page.Should().Be(1);
        applications.PageSize.Should().Be(10);
        applications.TotalItems.Should().Be(0);
        applications.TotalPages.Should().Be(0);
    }

    [Fact]
    public async Task List_ReturnsOnlyAuthenticatedUsersApplications()
    {
        var owner = await factory.RegisterUserAsync();
        var other = await factory.RegisterUserAsync();
        var ownerFirst = await owner.Client.CreateApplicationAsync(
            ApiTestHelpers.ValidApplicationRequest(companyName: "Owner One"));
        var ownerSecond = await owner.Client.CreateApplicationAsync(
            ApiTestHelpers.ValidApplicationRequest(companyName: "Owner Two"));
        var otherApplication = await other.Client.CreateApplicationAsync(
            ApiTestHelpers.ValidApplicationRequest(companyName: "Other"));

        var response = await owner.Client.GetAsync("/applications/");

        response.StatusCode.Should().Be(HttpStatusCode.OK);
        var applications = await response.Content.ReadFromJsonAsync<TestApplicationListResponse>();
        applications.Should().NotBeNull();
        applications!.Items.Select(application => application.Id)
            .Should()
            .BeEquivalentTo([ownerFirst.Id, ownerSecond.Id]);
        applications.Items.Select(application => application.Id).Should().NotContain(otherApplication.Id);
        applications.TotalItems.Should().Be(2);
    }

    [Fact]
    public async Task List_ResponseIncludesPrivateFieldsButNotUserId()
    {
        var user = await factory.RegisterUserAsync();
        await user.Client.CreateApplicationAsync();

        var response = await user.Client.GetAsync("/applications/");

        response.StatusCode.Should().Be(HttpStatusCode.OK);
        using var json = await JsonDocument.ParseAsync(await response.Content.ReadAsStreamAsync());
        var first = json.RootElement.GetProperty("items").EnumerateArray().Single();
        first.TryGetProperty("privateNote", out _).Should().BeTrue();
        first.TryGetProperty("userId", out _).Should().BeFalse();
    }

    [Fact]
    public async Task List_DefaultsToFirstPageWithTenApplicationsAndTotals()
    {
        var user = await factory.RegisterUserAsync();

        for (var index = 1; index <= 12; index++)
        {
            await user.Client.CreateApplicationAsync(
                ApiTestHelpers.ValidApplicationRequest(companyName: $"Company {index:00}"));
        }

        var response = await user.Client.GetAsync("/applications/");

        response.StatusCode.Should().Be(HttpStatusCode.OK);
        var applications = await response.Content.ReadFromJsonAsync<TestApplicationListResponse>();
        applications.Should().NotBeNull();
        applications!.Items.Should().HaveCount(10);
        applications.Page.Should().Be(1);
        applications.PageSize.Should().Be(10);
        applications.TotalItems.Should().Be(12);
        applications.TotalPages.Should().Be(2);
    }

    [Fact]
    public async Task List_FiltersByMultipleStatuses()
    {
        var user = await factory.RegisterUserAsync();
        var applied = await user.Client.CreateApplicationAsync(
            ApiTestHelpers.ValidApplicationRequest(companyName: "Applied", status: ApplicationStatuses.Applied));
        var offer = await user.Client.CreateApplicationAsync(
            ApiTestHelpers.ValidApplicationRequest(companyName: "Offer", status: ApplicationStatuses.Offer));
        await user.Client.CreateApplicationAsync(
            ApiTestHelpers.ValidApplicationRequest(companyName: "Rejected", status: ApplicationStatuses.Rejected));

        var response = await user.Client.GetAsync(
            $"/applications/?status={ApplicationStatuses.Applied}&status={ApplicationStatuses.Offer}");

        response.StatusCode.Should().Be(HttpStatusCode.OK);
        var applications = await response.Content.ReadFromJsonAsync<TestApplicationListResponse>();
        applications.Should().NotBeNull();
        applications!.Items.Select(application => application.Id)
            .Should()
            .BeEquivalentTo([applied.Id, offer.Id]);
        applications.TotalItems.Should().Be(2);
    }

    [Theory]
    [InlineData("northstar", "Northstar Labs")]
    [InlineData("FULL stack", "Atlas Works")]
    public async Task List_SearchesCompanyNameAndJobTitleCaseInsensitively(
        string search,
        string expectedCompany)
    {
        var user = await factory.RegisterUserAsync();
        await user.Client.CreateApplicationAsync(
            ApiTestHelpers.ValidApplicationRequest(companyName: "Northstar Labs", jobTitle: "Frontend Engineer"));
        await user.Client.CreateApplicationAsync(
            ApiTestHelpers.ValidApplicationRequest(companyName: "Atlas Works", jobTitle: "Full Stack Developer"));
        await user.Client.CreateApplicationAsync(
            ApiTestHelpers.ValidApplicationRequest(companyName: "Orbit Systems", jobTitle: "Backend Engineer"));

        var response = await user.Client.GetAsync($"/applications/?search={Uri.EscapeDataString(search)}");

        response.StatusCode.Should().Be(HttpStatusCode.OK);
        var applications = await response.Content.ReadFromJsonAsync<TestApplicationListResponse>();
        applications.Should().NotBeNull();
        applications!.Items.Should().ContainSingle();
        applications.Items[0].CompanyName.Should().Be(expectedCompany);
        applications.TotalItems.Should().Be(1);
    }

    [Theory]
    [InlineData("company", "asc", "Alpha Co", "Zulu Co")]
    [InlineData("company", "desc", "Zulu Co", "Alpha Co")]
    [InlineData("role", "asc", "Backend Engineer", "Product Designer")]
    [InlineData("role", "desc", "Product Designer", "Backend Engineer")]
    [InlineData("status", "asc", ApplicationStatuses.Applied, ApplicationStatuses.Offer)]
    [InlineData("status", "desc", ApplicationStatuses.Offer, ApplicationStatuses.Applied)]
    public async Task List_SortsByRequestedFieldAndDirection(
        string sortBy,
        string sortDirection,
        string expectedFirst,
        string expectedLast)
    {
        var user = await factory.RegisterUserAsync();
        await user.Client.CreateApplicationAsync(
            ApiTestHelpers.ValidApplicationRequest(
                companyName: "Zulu Co",
                jobTitle: "Product Designer",
                status: ApplicationStatuses.Offer));
        await user.Client.CreateApplicationAsync(
            ApiTestHelpers.ValidApplicationRequest(
                companyName: "Alpha Co",
                jobTitle: "Backend Engineer",
                status: ApplicationStatuses.Applied));

        var response = await user.Client.GetAsync(
            $"/applications/?sortBy={sortBy}&sortDirection={sortDirection}");

        response.StatusCode.Should().Be(HttpStatusCode.OK);
        var applications = await response.Content.ReadFromJsonAsync<TestApplicationListResponse>();
        applications.Should().NotBeNull();
        applications!.Items.Should().HaveCount(2);

        var values = applications.Items.Select(application => sortBy switch
        {
            "company" => application.CompanyName,
            "role" => application.JobTitle,
            "status" => application.Status,
            _ => throw new InvalidOperationException($"Unsupported sort {sortBy}.")
        }).ToList();

        values.First().Should().Be(expectedFirst);
        values.Last().Should().Be(expectedLast);
    }

    [Fact]
    public async Task List_SortsByLastUpdated()
    {
        var user = await factory.RegisterUserAsync();
        var first = await user.Client.CreateApplicationAsync(
            ApiTestHelpers.ValidApplicationRequest(companyName: "First"));
        await Task.Delay(20);
        var second = await user.Client.CreateApplicationAsync(
            ApiTestHelpers.ValidApplicationRequest(companyName: "Second"));

        var response = await user.Client.GetAsync("/applications/?sortBy=lastUpdated&sortDirection=asc");

        response.StatusCode.Should().Be(HttpStatusCode.OK);
        var applications = await response.Content.ReadFromJsonAsync<TestApplicationListResponse>();
        applications.Should().NotBeNull();
        applications!.Items.Select(application => application.Id).Should().Equal([first.Id, second.Id]);
    }

    [Fact]
    public async Task List_PaginatesRequestedPageAfterFilteringAndSorting()
    {
        var owner = await factory.RegisterUserAsync();
        var other = await factory.RegisterUserAsync();

        for (var index = 1; index <= 12; index++)
        {
            await owner.Client.CreateApplicationAsync(
                ApiTestHelpers.ValidApplicationRequest(companyName: $"Company {index:00}"));
        }

        await other.Client.CreateApplicationAsync(
            ApiTestHelpers.ValidApplicationRequest(companyName: "Company 13"));

        var response = await owner.Client.GetAsync("/applications/?page=2&sortBy=company&sortDirection=asc");

        response.StatusCode.Should().Be(HttpStatusCode.OK);
        var applications = await response.Content.ReadFromJsonAsync<TestApplicationListResponse>();
        applications.Should().NotBeNull();
        applications!.Items.Select(application => application.CompanyName)
            .Should()
            .Equal(["Company 11", "Company 12"]);
        applications.Page.Should().Be(2);
        applications.PageSize.Should().Be(10);
        applications.TotalItems.Should().Be(12);
        applications.TotalPages.Should().Be(2);
    }

    [Theory]
    [InlineData("/applications/?page=0")]
    [InlineData("/applications/?status=not_a_status")]
    [InlineData("/applications/?sortBy=createdAt")]
    [InlineData("/applications/?sortDirection=sideways")]
    public async Task List_ReturnsValidationProblem_WhenQueryIsInvalid(string url)
    {
        var user = await factory.RegisterUserAsync();

        var response = await user.Client.GetAsync(url);

        response.StatusCode.Should().Be(HttpStatusCode.BadRequest);
    }

    [Fact]
    public async Task GetById_ReturnsOwnerApplicationWithPrivateNote()
    {
        var user = await factory.RegisterUserAsync();
        var created = await user.Client.CreateApplicationAsync();

        var response = await user.Client.GetAsync($"/applications/{created.Id}");

        response.StatusCode.Should().Be(HttpStatusCode.OK);
        var application = await response.Content.ReadFromJsonAsync<TestApplicationResponse>();
        application.Should().NotBeNull();
        application!.Id.Should().Be(created.Id);
        application.PrivateNote.Should().Be(created.PrivateNote);
    }

    [Fact]
    public async Task GetById_ReturnsNotFound_WhenApplicationDoesNotExist()
    {
        var user = await factory.RegisterUserAsync();

        var response = await user.Client.GetAsync($"/applications/{Guid.NewGuid()}");

        response.StatusCode.Should().Be(HttpStatusCode.NotFound);
    }

    [Fact]
    public async Task GetById_ReturnsNotFound_WhenApplicationBelongsToAnotherUser()
    {
        var owner = await factory.RegisterUserAsync();
        var other = await factory.RegisterUserAsync();
        var application = await owner.Client.CreateApplicationAsync();

        var response = await other.Client.GetAsync($"/applications/{application.Id}");

        response.StatusCode.Should().Be(HttpStatusCode.NotFound);
    }

    [Fact]
    public async Task Update_ReturnsNoContentAndUpdatesEditableFields_WhenOwnerUpdates()
    {
        var user = await factory.RegisterUserAsync();
        var created = await user.Client.CreateApplicationAsync();
        await Task.Delay(20);
        var update = ApiTestHelpers.ValidApplicationRequest(
            companyName: "Updated Company",
            jobTitle: "Updated Role",
            status: ApplicationStatuses.Offer,
            publicNote: "Updated public note",
            privateNote: "Updated private note",
            lastContactAt: new DateTimeOffset(2026, 06, 03, 10, 0, 0, TimeSpan.Zero),
            nextActionAt: new DateTimeOffset(2026, 06, 10, 10, 0, 0, TimeSpan.Zero));

        var response = await user.Client.PutAsJsonAsync($"/applications/{created.Id}", update);

        response.StatusCode.Should().Be(HttpStatusCode.NoContent);

        var getResponse = await user.Client.GetAsync($"/applications/{created.Id}");
        var updated = await getResponse.Content.ReadFromJsonAsync<TestApplicationResponse>();
        updated.Should().NotBeNull();
        updated!.CompanyName.Should().Be(update.CompanyName);
        updated.JobTitle.Should().Be(update.JobTitle);
        updated.Status.Should().Be(update.Status);
        updated.PublicNote.Should().Be(update.PublicNote);
        updated.PrivateNote.Should().Be(update.PrivateNote);
        updated.LastContactAt.Should().Be(update.LastContactAt);
        updated.NextActionAt.Should().Be(update.NextActionAt);
        updated.UpdatedAt.Should().BeAfter(created.UpdatedAt);
    }

    [Fact]
    public async Task Update_ReturnsNotFound_WhenApplicationDoesNotExist()
    {
        var user = await factory.RegisterUserAsync();

        var response = await user.Client.PutAsJsonAsync(
            $"/applications/{Guid.NewGuid()}",
            ApiTestHelpers.ValidApplicationRequest());

        response.StatusCode.Should().Be(HttpStatusCode.NotFound);
    }

    [Fact]
    public async Task Update_ReturnsNotFound_WhenApplicationBelongsToAnotherUser()
    {
        var owner = await factory.RegisterUserAsync();
        var other = await factory.RegisterUserAsync();
        var application = await owner.Client.CreateApplicationAsync();

        var response = await other.Client.PutAsJsonAsync(
            $"/applications/{application.Id}",
            ApiTestHelpers.ValidApplicationRequest(companyName: "Attempted takeover"));

        response.StatusCode.Should().Be(HttpStatusCode.NotFound);

        var ownerResponse = await owner.Client.GetAsync($"/applications/{application.Id}");
        var unchanged = await ownerResponse.Content.ReadFromJsonAsync<TestApplicationResponse>();
        unchanged.Should().NotBeNull();
        unchanged!.CompanyName.Should().Be(application.CompanyName);
    }

    [Theory]
    [MemberData(nameof(InvalidApplicationRequests))]
    public async Task Update_ReturnsValidationProblem_WhenRequestIsInvalid(
        TestApplicationRequest request,
        string expectedErrorKey)
    {
        var user = await factory.RegisterUserAsync();
        var application = await user.Client.CreateApplicationAsync();

        var response = await user.Client.PutAsJsonAsync($"/applications/{application.Id}", request);

        response.StatusCode.Should().Be(HttpStatusCode.BadRequest);
        var problem = await response.Content.ReadFromJsonAsync<ValidationProblemDetails>();
        problem.Should().NotBeNull();
        problem!.Errors.Should().ContainKey(expectedErrorKey);
    }

    [Fact]
    public async Task Delete_ReturnsNoContentAndRemovesApplication_WhenOwnerDeletes()
    {
        var user = await factory.RegisterUserAsync();
        var application = await user.Client.CreateApplicationAsync();

        var response = await user.Client.DeleteAsync($"/applications/{application.Id}");

        response.StatusCode.Should().Be(HttpStatusCode.NoContent);

        var getResponse = await user.Client.GetAsync($"/applications/{application.Id}");
        getResponse.StatusCode.Should().Be(HttpStatusCode.NotFound);
    }

    [Fact]
    public async Task Delete_ReturnsNotFound_WhenApplicationDoesNotExist()
    {
        var user = await factory.RegisterUserAsync();

        var response = await user.Client.DeleteAsync($"/applications/{Guid.NewGuid()}");

        response.StatusCode.Should().Be(HttpStatusCode.NotFound);
    }

    [Fact]
    public async Task Delete_ReturnsNotFoundAndDoesNotDelete_WhenApplicationBelongsToAnotherUser()
    {
        var owner = await factory.RegisterUserAsync();
        var other = await factory.RegisterUserAsync();
        var application = await owner.Client.CreateApplicationAsync();

        var response = await other.Client.DeleteAsync($"/applications/{application.Id}");

        response.StatusCode.Should().Be(HttpStatusCode.NotFound);

        var ownerResponse = await owner.Client.GetAsync($"/applications/{application.Id}");
        ownerResponse.StatusCode.Should().Be(HttpStatusCode.OK);
    }

    public static TheoryData<TestApplicationRequest, string> InvalidApplicationRequests()
    {
        var overlongCompanyName = new string('c', 201);
        var overlongJobTitle = new string('j', 201);
        var overlongStatus = new string('s', 65);
        var overlongPublicNote = new string('p', 2001);
        var overlongPrivateNote = new string('p', 4001);

        return new TheoryData<TestApplicationRequest, string>
        {
            { ApiTestHelpers.ValidApplicationRequest(companyName: ""), "CompanyName" },
            { ApiTestHelpers.ValidApplicationRequest(companyName: overlongCompanyName), "CompanyName" },
            { ApiTestHelpers.ValidApplicationRequest(jobTitle: ""), "JobTitle" },
            { ApiTestHelpers.ValidApplicationRequest(jobTitle: overlongJobTitle), "JobTitle" },
            { ApiTestHelpers.ValidApplicationRequest(status: ""), "Status" },
            { ApiTestHelpers.ValidApplicationRequest(status: "not_a_status"), "Status" },
            { ApiTestHelpers.ValidApplicationRequest(status: overlongStatus), "Status" },
            { ApiTestHelpers.ValidApplicationRequest(publicNote: overlongPublicNote), "PublicNote" },
            { ApiTestHelpers.ValidApplicationRequest(privateNote: overlongPrivateNote), "PrivateNote" }
        };
    }
}
