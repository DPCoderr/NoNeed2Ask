using System.Net;
using System.Net.Http.Json;
using System.Text.Json;
using FluentAssertions;
using NoNeed2Ask.Api.Tests.Support;

namespace NoNeed2Ask.Api.Tests;

public sealed class PublicProfileIntegrationTests(ApiFactory factory) : IClassFixture<ApiFactory>
{
    [Theory]
    [InlineData("GET")]
    [InlineData("PATCH")]
    public async Task PublicProfileSettings_ReturnsUnauthorized_WhenUnauthenticated(string method)
    {
        var client = factory.CreateCookieClient();
        var request = new HttpRequestMessage(
            method == "GET" ? HttpMethod.Get : HttpMethod.Patch,
            "/settings/public-profile");

        if (method == "PATCH")
        {
            request.Content = JsonContent.Create(new { isPublicSharingEnabled = true });
        }

        var response = await client.SendAsync(request);

        response.StatusCode.Should().Be(HttpStatusCode.Unauthorized);
    }

    [Fact]
    public async Task Register_CreatesPrivatePublicProfileSettings()
    {
        var user = await factory.RegisterUserAsync(username: "Jane-Doe");

        var response = await user.Client.GetAsync("/settings/public-profile");

        response.StatusCode.Should().Be(HttpStatusCode.OK);
        var settings = await response.Content.ReadFromJsonAsync<TestPublicProfileSettingsResponse>();
        settings.Should().NotBeNull();
        settings!.UserId.Should().Be(user.Id);
        settings.PublicPageId.Should().NotBeEmpty().And.NotBe(user.Id);
        settings.PublicPageId.ToString()[14].Should().Be('4');
        settings.IsPublicSharingEnabled.Should().BeFalse();
        settings.CreatedAt.Should().BeCloseTo(settings.UpdatedAt, TimeSpan.FromSeconds(1));
    }

    [Fact]
    public async Task Update_TogglesPublicSharingAndPersistsUpdatedAt()
    {
        var user = await factory.RegisterUserAsync();
        var initialResponse = await user.Client.GetAsync("/settings/public-profile");
        var initial = await initialResponse.Content.ReadFromJsonAsync<TestPublicProfileSettingsResponse>();
        initial.Should().NotBeNull();
        await Task.Delay(20);

        var updateResponse = await user.Client.PatchAsJsonAsync(
            "/settings/public-profile",
            new { isPublicSharingEnabled = true });

        updateResponse.StatusCode.Should().Be(HttpStatusCode.OK);
        var updated = await updateResponse.Content.ReadFromJsonAsync<TestPublicProfileSettingsResponse>();
        updated.Should().NotBeNull();
        updated!.IsPublicSharingEnabled.Should().BeTrue();
        updated.PublicPageId.Should().Be(initial!.PublicPageId);
        updated.UpdatedAt.Should().BeAfter(initial!.UpdatedAt);

        var persistedResponse = await user.Client.GetAsync("/settings/public-profile");
        var persisted = await persistedResponse.Content.ReadFromJsonAsync<TestPublicProfileSettingsResponse>();
        persisted.Should().NotBeNull();
        persisted!.IsPublicSharingEnabled.Should().BeTrue();
        persisted.PublicPageId.Should().Be(initial!.PublicPageId);
        // PostgreSQL stores microseconds; .NET timestamps can contain sub-microsecond ticks.
        persisted.UpdatedAt.Should().BeCloseTo(updated.UpdatedAt, TimeSpan.FromMicroseconds(1));
    }

    [Fact]
    public async Task PublicStatus_ReturnsNotFound_WhenPageIdDoesNotExist()
    {
        var client = factory.CreateCookieClient();

        var response = await client.GetAsync($"/status/{Guid.NewGuid()}");

        response.StatusCode.Should().Be(HttpStatusCode.NotFound);
    }

    [Fact]
    public async Task PublicStatus_RejectsNamesAndUserId_EvenWhenSharingIsOn()
    {
        var user = await factory.RegisterUserAsync(username: "Guessable-Owner");
        var other = await factory.RegisterUserAsync();
        var settings = await GetSettingsAsync(user.Client);
        var otherSettings = await GetSettingsAsync(other.Client);
        settings.PublicPageId.Should().NotBe(otherSettings.PublicPageId);
        await user.Client.PatchAsJsonAsync(
            "/settings/public-profile", new { isPublicSharingEnabled = true });

        var visitor = factory.CreateCookieClient();
        foreach (var identifier in new[] { user.Username, "guessable-owner-job-search", "not-a-guid", user.Id.ToString() })
        {
            var response = await visitor.GetAsync($"/status/{identifier}");
            response.StatusCode.Should().Be(HttpStatusCode.NotFound);
        }

        (await visitor.GetAsync($"/status/{settings.PublicPageId}")).StatusCode.Should().Be(HttpStatusCode.OK);
        await user.Client.PatchAsJsonAsync(
            "/settings/public-profile", new { isPublicSharingEnabled = false });
        var disabled = await visitor.GetAsync($"/status/{settings.PublicPageId}");
        using var json = await JsonDocument.ParseAsync(await disabled.Content.ReadAsStreamAsync());
        json.RootElement.GetProperty("kind").GetString().Should().Be("disabled");
        json.RootElement.TryGetProperty("profile", out _).Should().BeFalse();
        json.RootElement.TryGetProperty("applications", out _).Should().BeFalse();
    }

    [Fact]
    public async Task PublicStatus_ReturnsDisabledResponse_WhenSharingIsOff()
    {
        var user = await factory.RegisterUserAsync(username: "Private-Owner");
        var settings = await GetSettingsAsync(user.Client);

        var response = await factory.CreateCookieClient().GetAsync($"/status/{settings.PublicPageId}");

        response.StatusCode.Should().Be(HttpStatusCode.OK);
        using var json = await JsonDocument.ParseAsync(await response.Content.ReadAsStreamAsync());
        json.RootElement.GetProperty("kind").GetString().Should().Be("disabled");
        json.RootElement.GetProperty("message").GetString()
            .Should().Be("This status page is currently private.");
        json.RootElement.TryGetProperty("applications", out _).Should().BeFalse();
    }

    [Fact]
    public async Task PublicStatus_ReturnsPublicApplicationsOnly_WhenSharingIsOn()
    {
        var user = await factory.RegisterUserAsync(username: "Public-Owner");
        var application = await user.Client.CreateApplicationAsync(
            ApiTestHelpers.ValidApplicationRequest(
                companyName: "Northstar Labs",
                jobTitle: "Frontend Engineer",
                publicNote: "Public note",
                privateNote: "Private note"));
        var settings = await GetSettingsAsync(user.Client);
        await user.Client.PatchAsJsonAsync(
            "/settings/public-profile",
            new { isPublicSharingEnabled = true });

        var response = await factory.CreateCookieClient().GetAsync($"/status/{settings.PublicPageId}");

        response.StatusCode.Should().Be(HttpStatusCode.OK);
        using var json = await JsonDocument.ParseAsync(await response.Content.ReadAsStreamAsync());
        json.RootElement.GetProperty("kind").GetString().Should().Be("enabled");
        json.RootElement.GetProperty("profile").GetProperty("publicPageId").GetGuid()
            .Should().Be(settings.PublicPageId);
        var publicApplications = json.RootElement.GetProperty("applications")
            .EnumerateArray()
            .ToList();
        publicApplications.Should().ContainSingle();
        var publicApplication = publicApplications.Single();
        publicApplication.GetProperty("companyName").GetString().Should().Be(application.CompanyName);
        publicApplication.GetProperty("jobTitle").GetString().Should().Be(application.JobTitle);
        publicApplication.GetProperty("publicNote").GetString().Should().Be(application.PublicNote);
        publicApplication.TryGetProperty("privateNote", out _).Should().BeFalse();
        publicApplication.TryGetProperty("userId", out _).Should().BeFalse();
        publicApplication.TryGetProperty("id", out _).Should().BeFalse();
        publicApplication.TryGetProperty("lastContactAt", out _).Should().BeFalse();
    }

    private static async Task<TestPublicProfileSettingsResponse> GetSettingsAsync(HttpClient client)
    {
        var response = await client.GetAsync("/settings/public-profile");
        response.StatusCode.Should().Be(HttpStatusCode.OK);
        var settings = await response.Content.ReadFromJsonAsync<TestPublicProfileSettingsResponse>();
        settings.Should().NotBeNull();

        return settings!;
    }
}
