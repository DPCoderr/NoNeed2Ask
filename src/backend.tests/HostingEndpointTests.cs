using System.Net;
using FluentAssertions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.Hosting;

namespace NoNeed2Ask.Api.Tests;

public sealed class HostingEndpointTests
{
    [Theory]
    [InlineData("Production")]
    [InlineData("Development")]
    public async Task Alive_IsPublicAndUncached_InEveryEnvironment(string environment)
    {
        var builder = WebApplication.CreateBuilder(new WebApplicationOptions
        {
            EnvironmentName = environment
        });
        builder.WebHost.UseTestServer();
        builder.AddServiceDefaults();

        await using var app = builder.Build();
        app.MapDefaultEndpoints();
        await app.StartAsync();
        using var client = app.GetTestClient();

        var response = await client.GetAsync("/alive");

        response.StatusCode.Should().Be(HttpStatusCode.OK);
        (await response.Content.ReadAsStringAsync()).Should().Be("Healthy");
        response.Headers.CacheControl!.NoStore.Should().BeTrue();

        var health = await client.GetAsync("/health");
        health.StatusCode.Should().Be(environment == "Development"
            ? HttpStatusCode.OK
            : HttpStatusCode.NotFound);
    }
}
