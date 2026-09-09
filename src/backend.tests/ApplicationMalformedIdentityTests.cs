using System.Net;
using System.Net.Http.Json;
using System.Security.Claims;
using System.Text.Encodings.Web;
using FluentAssertions;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using NoNeed2Ask.Api.Database;
using NoNeed2Ask.Api.Features.Application;
using NoNeed2Ask.Api.Tests.Support;

namespace NoNeed2Ask.Api.Tests;

public sealed class ApplicationMalformedIdentityTests(ApiFactory factory) : IClassFixture<ApiFactory>
{
    private const string MalformedAuthenticationScheme = "MalformedIdentity";

    [Theory]
    [InlineData("POST", "/applications/")]
    [InlineData("GET", "/applications/00000000-0000-0000-0000-000000000000")]
    [InlineData("PUT", "/applications/00000000-0000-0000-0000-000000000000")]
    [InlineData("DELETE", "/applications/00000000-0000-0000-0000-000000000000")]
    public async Task ApplicationEndpoint_ReturnsUnauthorized_WhenUserIdClaimIsMalformed(
        string method,
        string path)
    {
        using var malformedIdentityFactory = factory.WithWebHostBuilder(builder =>
            builder.ConfigureTestServices(services =>
            {
                services
                    .AddAuthentication(options =>
                    {
                        options.DefaultAuthenticateScheme = MalformedAuthenticationScheme;
                        options.DefaultChallengeScheme = MalformedAuthenticationScheme;
                        options.DefaultForbidScheme = MalformedAuthenticationScheme;
                    })
                    .AddScheme<AuthenticationSchemeOptions, MalformedIdentityAuthenticationHandler>(
                        MalformedAuthenticationScheme,
                        _ => { });
            }));

        using var client = malformedIdentityFactory.CreateClient(new WebApplicationFactoryClientOptions
        {
            AllowAutoRedirect = false,
            BaseAddress = new Uri("https://localhost")
        });

        using var request = new HttpRequestMessage(new HttpMethod(method), path);

        if (method is "POST" or "PUT")
        {
            request.Content = JsonContent.Create(ApiTestHelpers.ValidApplicationRequest());
        }

        var response = await client.SendAsync(request);

        response.StatusCode.Should().Be(HttpStatusCode.Unauthorized);
    }

    [Fact]
    public async Task List_ReturnsUnauthorized_WhenUserIdClaimIsMalformed()
    {
        await AssertUnauthorizedAsync(async dbContext =>
            (IResult)await ApplicationList.Handle(
                new ApplicationListRequestDto(),
                dbContext,
                MalformedPrincipal(),
                CancellationToken.None));
    }

    private static async Task AssertUnauthorizedAsync(Func<AppDbContext, Task<IResult>> act)
    {
        await using var dbContext = CreateDbContext();
        var result = await act(dbContext);
        var httpContext = new DefaultHttpContext();
        httpContext.RequestServices = new ServiceCollection()
            .AddLogging()
            .AddProblemDetails()
            .BuildServiceProvider();

        await result.ExecuteAsync(httpContext);

        httpContext.Response.StatusCode.Should().Be(StatusCodes.Status401Unauthorized);
    }

    private static AppDbContext CreateDbContext()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseNpgsql("Host=localhost;Database=unused;Username=postgres;Password=postgres")
            .Options;

        return new AppDbContext(options);
    }

    private static ClaimsPrincipal MalformedPrincipal()
    {
        return new ClaimsPrincipal(new ClaimsIdentity(
            [new Claim(ClaimTypes.NameIdentifier, "not-a-guid")],
            authenticationType: "Test"));
    }

    private sealed class MalformedIdentityAuthenticationHandler(
        IOptionsMonitor<AuthenticationSchemeOptions> options,
        ILoggerFactory logger,
        UrlEncoder encoder)
        : AuthenticationHandler<AuthenticationSchemeOptions>(options, logger, encoder)
    {
        protected override Task<AuthenticateResult> HandleAuthenticateAsync()
        {
            var identity = new ClaimsIdentity(
                [new Claim(ClaimTypes.NameIdentifier, "not-a-guid")],
                authenticationType: Scheme.Name);
            var principal = new ClaimsPrincipal(identity);
            var ticket = new AuthenticationTicket(principal, Scheme.Name);

            return Task.FromResult(AuthenticateResult.Success(ticket));
        }
    }
}
