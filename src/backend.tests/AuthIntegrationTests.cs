using System.Net;
using System.Net.Http.Json;
using System.Text.Json;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using NoNeed2Ask.Api.Tests.Support;

namespace NoNeed2Ask.Api.Tests;

public sealed class AuthIntegrationTests(ApiFactory factory) : IClassFixture<ApiFactory>
{
    [Fact]
    public async Task Register_ReturnsUserAndSignsIn_WhenRequestIsValid()
    {
        var client = factory.CreateCookieClient();

        var response = await client.PostAsJsonAsync("/auth/register", new
        {
            username = "valid-user",
            email = $"valid-{Guid.NewGuid():N}@example.test",
            password = ApiTestHelpers.ValidPassword,
            rememberMe = false
        });

        response.StatusCode.Should().Be(HttpStatusCode.OK);

        var body = await response.Content.ReadFromJsonAsync<AuthUserResponse>();
        body.Should().NotBeNull();
        body!.Id.Should().NotBeEmpty();
        body.Username.Should().Be("valid-user");
        body.Email.Should().StartWith("valid-").And.EndWith("@example.test");

        var meResponse = await client.GetAsync("/auth/me");
        meResponse.StatusCode.Should().Be(HttpStatusCode.OK);
    }

    [Fact]
    public async Task Register_RespectsRememberMeWithoutChangingResponseShape()
    {
        var client = factory.CreateCookieClient();

        var response = await client.PostAsJsonAsync("/auth/register", new
        {
            username = $"remember-{Guid.NewGuid():N}",
            email = $"remember-{Guid.NewGuid():N}@example.test",
            password = ApiTestHelpers.ValidPassword,
            rememberMe = true
        });

        response.StatusCode.Should().Be(HttpStatusCode.OK);

        using var json = await JsonDocument.ParseAsync(await response.Content.ReadAsStreamAsync());
        json.RootElement.EnumerateObject()
            .Select(property => property.Name)
            .Should()
            .BeEquivalentTo("id", "username", "email");

        var meResponse = await client.GetAsync("/auth/me");
        meResponse.StatusCode.Should().Be(HttpStatusCode.OK);
    }

    [Theory]
    [MemberData(nameof(InvalidRegisterRequests))]
    public async Task Register_ReturnsValidationProblem_WhenRequestIsInvalid(
        object request,
        string expectedErrorKey)
    {
        var client = factory.CreateCookieClient();

        var response = await client.PostAsJsonAsync("/auth/register", request);

        response.StatusCode.Should().Be(HttpStatusCode.BadRequest);
        var problem = await response.Content.ReadFromJsonAsync<ValidationProblemDetails>();
        problem.Should().NotBeNull();
        problem!.Errors.Should().ContainKey(expectedErrorKey);
    }

    [Fact]
    public async Task Register_ReturnsValidationProblem_WhenEmailAlreadyExists()
    {
        var existing = await factory.RegisterUserAsync();
        var client = factory.CreateCookieClient();

        var response = await client.PostAsJsonAsync("/auth/register", new
        {
            username = $"duplicate-email-{Guid.NewGuid():N}",
            email = existing.Email,
            password = ApiTestHelpers.ValidPassword,
            rememberMe = false
        });

        response.StatusCode.Should().Be(HttpStatusCode.BadRequest);
        var problem = await response.Content.ReadFromJsonAsync<ValidationProblemDetails>();
        problem.Should().NotBeNull();
        problem!.Errors.Should().ContainKey("Email");
    }

    [Fact]
    public async Task Register_ReturnsValidationProblem_WhenUsernameAlreadyExists()
    {
        var existing = await factory.RegisterUserAsync();
        var client = factory.CreateCookieClient();

        var response = await client.PostAsJsonAsync("/auth/register", new
        {
            username = existing.Username,
            email = $"duplicate-username-{Guid.NewGuid():N}@example.test",
            password = ApiTestHelpers.ValidPassword,
            rememberMe = false
        });

        response.StatusCode.Should().Be(HttpStatusCode.BadRequest);
        var problem = await response.Content.ReadFromJsonAsync<ValidationProblemDetails>();
        problem.Should().NotBeNull();
        problem!.Errors.Should().ContainKey("Username");
    }

    [Fact]
    public async Task Login_ReturnsUserAndSignsIn_WhenCredentialsAreValid()
    {
        var existing = await factory.RegisterUserAsync();

        var client = await factory.LoginUserAsync(existing.Email, existing.Password);
        var meResponse = await client.GetAsync("/auth/me");

        meResponse.StatusCode.Should().Be(HttpStatusCode.OK);
        var body = await meResponse.Content.ReadFromJsonAsync<AuthUserResponse>();
        body.Should().NotBeNull();
        body!.Id.Should().Be(existing.Id);
        body.Username.Should().Be(existing.Username);
        body.Email.Should().Be(existing.Email);
    }

    [Theory]
    [InlineData("missing@example.test", ApiTestHelpers.ValidPassword)]
    [InlineData(null, "WrongPassword1!")]
    public async Task Login_ReturnsUnauthorized_WhenCredentialsAreInvalid(
        string? emailOverride,
        string password)
    {
        var existing = await factory.RegisterUserAsync();
        var client = factory.CreateCookieClient();

        var response = await client.PostAsJsonAsync("/auth/login", new
        {
            email = emailOverride ?? existing.Email,
            password,
            rememberMe = false
        });

        response.StatusCode.Should().Be(HttpStatusCode.Unauthorized);
        var problem = await response.Content.ReadFromJsonAsync<ProblemDetails>();
        problem.Should().NotBeNull();
        problem!.Title.Should().Be("Unauthorized");
    }

    [Theory]
    [InlineData("not-an-email", ApiTestHelpers.ValidPassword, "Email")]
    [InlineData("valid@example.test", "", "Password")]
    public async Task Login_ReturnsValidationProblem_WhenRequestIsInvalid(
        string email,
        string password,
        string expectedErrorKey)
    {
        var client = factory.CreateCookieClient();

        var response = await client.PostAsJsonAsync("/auth/login", new
        {
            email,
            password,
            rememberMe = false
        });

        response.StatusCode.Should().Be(HttpStatusCode.BadRequest);
        var problem = await response.Content.ReadFromJsonAsync<ValidationProblemDetails>();
        problem.Should().NotBeNull();
        problem!.Errors.Should().ContainKey(expectedErrorKey);
    }

    [Fact]
    public async Task Me_ReturnsUnauthorized_WhenUnauthenticated()
    {
        var client = factory.CreateCookieClient();

        var response = await client.GetAsync("/auth/me");

        response.StatusCode.Should().Be(HttpStatusCode.Unauthorized);
    }

    [Fact]
    public async Task Me_ReturnsOnlyCurrentUserShape_WhenAuthenticated()
    {
        var user = await factory.RegisterUserAsync();

        var response = await user.Client.GetAsync("/auth/me");

        response.StatusCode.Should().Be(HttpStatusCode.OK);

        using var json = await JsonDocument.ParseAsync(await response.Content.ReadAsStreamAsync());
        json.RootElement.EnumerateObject()
            .Select(property => property.Name)
            .Should()
            .BeEquivalentTo("id", "username", "email");
    }

    [Fact]
    public async Task Logout_ReturnsUnauthorized_WhenUnauthenticated()
    {
        var client = factory.CreateCookieClient();

        var response = await client.PostAsync("/auth/logout", content: null);

        response.StatusCode.Should().Be(HttpStatusCode.Unauthorized);
    }

    [Fact]
    public async Task Logout_ClearsAuthentication_WhenAuthenticated()
    {
        var user = await factory.RegisterUserAsync();

        var logoutResponse = await user.Client.PostAsync("/auth/logout", content: null);
        logoutResponse.StatusCode.Should().Be(HttpStatusCode.NoContent);

        var meResponse = await user.Client.GetAsync("/auth/me");
        meResponse.StatusCode.Should().Be(HttpStatusCode.Unauthorized);
    }

    public static TheoryData<object, string> InvalidRegisterRequests()
    {
        return new TheoryData<object, string>
        {
            {
                new
                {
                    username = "",
                    email = $"missing-username-{Guid.NewGuid():N}@example.test",
                    password = ApiTestHelpers.ValidPassword,
                    rememberMe = false
                },
                "Username"
            },
            {
                new
                {
                    username = $"invalid-email-{Guid.NewGuid():N}",
                    email = "not-an-email",
                    password = ApiTestHelpers.ValidPassword,
                    rememberMe = false
                },
                "Email"
            },
            {
                new
                {
                    username = $"short-password-{Guid.NewGuid():N}",
                    email = $"short-password-{Guid.NewGuid():N}@example.test",
                    password = "Aa1!",
                    rememberMe = false
                },
                "Password"
            },
            {
                new
                {
                    username = $"missing-number-{Guid.NewGuid():N}",
                    email = $"missing-number-{Guid.NewGuid():N}@example.test",
                    password = "Password!",
                    rememberMe = false
                },
                "Password"
            },
            {
                new
                {
                    username = $"missing-lower-{Guid.NewGuid():N}",
                    email = $"missing-lower-{Guid.NewGuid():N}@example.test",
                    password = "PASSWORD1!",
                    rememberMe = false
                },
                "Password"
            },
            {
                new
                {
                    username = $"missing-upper-{Guid.NewGuid():N}",
                    email = $"missing-upper-{Guid.NewGuid():N}@example.test",
                    password = "password1!",
                    rememberMe = false
                },
                "Password"
            },
            {
                new
                {
                    username = $"missing-special-{Guid.NewGuid():N}",
                    email = $"missing-special-{Guid.NewGuid():N}@example.test",
                    password = "Password1",
                    rememberMe = false
                },
                "Password"
            }
        };
    }
}
