using System.Net.Http.Json;
using FluentAssertions;
using NoNeed2Ask.Api.Domain.Entities;

namespace NoNeed2Ask.Api.Tests.Support;

public static class ApiTestHelpers
{
    public const string ValidPassword = "Password1!";

    public static TestApplicationRequest ValidApplicationRequest(
        string companyName = "Acme",
        string jobTitle = "Software Engineer",
        string status = ApplicationStatuses.Applied,
        string? publicNote = "Public note",
        string? privateNote = "Private note",
        DateTimeOffset? lastContactAt = null,
        DateTimeOffset? nextActionAt = null)
    {
        return new TestApplicationRequest(
            companyName,
            jobTitle,
            status,
            publicNote,
            privateNote,
            lastContactAt ?? new DateTimeOffset(2026, 06, 01, 12, 0, 0, TimeSpan.Zero),
            nextActionAt ?? new DateTimeOffset(2026, 06, 15, 12, 0, 0, TimeSpan.Zero));
    }

    public static async Task<TestUser> RegisterUserAsync(
        this ApiFactory factory,
        string? username = null,
        string? email = null,
        string password = ValidPassword,
        bool rememberMe = false)
    {
        var unique = Guid.NewGuid().ToString("N");
        username ??= $"user-{unique}";
        email ??= $"user-{unique}@example.test";

        var client = factory.CreateCookieClient();
        var response = await client.PostAsJsonAsync("/auth/register", new
        {
            username,
            email,
            password,
            rememberMe
        });

        response.StatusCode.Should().Be(System.Net.HttpStatusCode.OK);

        var body = await response.Content.ReadFromJsonAsync<AuthUserResponse>();
        body.Should().NotBeNull();

        return new TestUser(client, body!.Id, username, email, password);
    }

    public static async Task<HttpClient> LoginUserAsync(this ApiFactory factory, string email, string password)
    {
        var client = factory.CreateCookieClient();
        var response = await client.PostAsJsonAsync("/auth/login", new
        {
            email,
            password,
            rememberMe = false
        });

        response.StatusCode.Should().Be(System.Net.HttpStatusCode.OK);

        return client;
    }

    public static async Task<TestApplicationResponse> CreateApplicationAsync(
        this HttpClient client,
        TestApplicationRequest? request = null)
    {
        var response = await client.PostAsJsonAsync("/applications/", request ?? ValidApplicationRequest());
        response.StatusCode.Should().Be(System.Net.HttpStatusCode.Created);

        var body = await response.Content.ReadFromJsonAsync<TestApplicationResponse>();
        body.Should().NotBeNull();

        return body!;
    }
}
