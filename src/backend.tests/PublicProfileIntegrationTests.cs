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
        var user = await factory.RegisterUserAsync(username: "Jane Doe");

        var response = await user.Client.GetAsync("/settings/public-profile");

        response.StatusCode.Should().Be(HttpStatusCode.OK);
        var settings = await response.Content.ReadFromJsonAsync<TestPublicProfileSettingsResponse>();
        settings.Should().NotBeNull();
        settings!.UserId.Should().Be(user.Id);
        settings.PublicSlug.Should().Be("jane-doe-job-search");
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
        updated.UpdatedAt.Should().BeAfter(initial!.UpdatedAt);

        var persistedResponse = await user.Client.GetAsync("/settings/public-profile");
        var persisted = await persistedResponse.Content.ReadFromJsonAsync<TestPublicProfileSettingsResponse>();
        persisted.Should().NotBeNull();
        persisted!.IsPublicSharingEnabled.Should().BeTrue();
        persisted.UpdatedAt.Should().Be(updated.UpdatedAt);
    }

    [Fact]
    public async Task PublicStatus_ReturnsNotFound_WhenSlugDoesNotExist()
    {
        var client = factory.CreateCookieClient();

        var response = await client.GetAsync("/status/missing-job-search");

        response.StatusCode.Should().Be(HttpStatusCode.NotFound);
    }

    [Fact]
    public async Task PublicStatus_ReturnsDisabledResponse_WhenSharingIsOff()
    {
        var user = await factory.RegisterUserAsync(username: "Private Owner");
        var settings = await GetSettingsAsync(user.Client);

        var response = await user.Client.GetAsync($"/status/{settings.PublicSlug}");

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
        var user = await factory.RegisterUserAsync(username: "Public Owner");
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

        var response = await user.Client.GetAsync($"/status/{settings.PublicSlug}");

        response.StatusCode.Should().Be(HttpStatusCode.OK);
        using var json = await JsonDocument.ParseAsync(await response.Content.ReadAsStreamAsync());
        json.RootElement.GetProperty("kind").GetString().Should().Be("enabled");
        json.RootElement.GetProperty("profile").GetProperty("publicSlug").GetString()
            .Should().Be(settings.PublicSlug);
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
