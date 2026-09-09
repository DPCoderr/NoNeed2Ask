using FluentAssertions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Metadata;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;
using NoNeed2Ask.Api.Features;
using NoNeed2Ask.Api.Shared;

namespace NoNeed2Ask.Api.Tests;

public sealed class EndpointRegistrationTests
{
    [Fact]
    public async Task MapEndpoints_RegistersAllFeatureRoutesExactlyOnce_WithTheirMetadata()
    {
        var builder = WebApplication.CreateBuilder();
        builder.Configuration["ConnectionStrings:noneed2askdb"] =
            "Host=localhost;Database=unused;Username=postgres;Password=postgres";
        builder.Services.AddDatabaseServices(builder.Configuration);
        builder.Services.AddFeatureServices();
        builder.Services.AddEndpoints(typeof(Program).Assembly);
        builder.Services.AddEndpoints(typeof(Program).Assembly);
        await using var app = builder.Build();

        app.MapEndpoints();

        var endpoints = ((IEndpointRouteBuilder)app).DataSources
            .SelectMany(source => source.Endpoints)
            .Cast<RouteEndpoint>()
            .ToList();

        endpoints.Select(endpoint => (
                endpoint.Metadata.GetMetadata<HttpMethodMetadata>()!.HttpMethods.Single(),
                endpoint.RoutePattern.RawText,
                endpoint.Metadata.GetMetadata<ITagsMetadata>()!.Tags.Single(),
                endpoint.Metadata.GetMetadata<IAuthorizeData>() != null,
                endpoint.Metadata.GetMetadata<EnableRateLimitingAttribute>()?.PolicyName))
            .Should().BeEquivalentTo(new[]
            {
                ("POST", "/applications/", "Applications", true, (string?)null),
                ("GET", "/applications/{id:guid}", "Applications", true, null),
                ("PUT", "/applications/{id:guid}", "Applications", true, null),
                ("DELETE", "/applications/{id:guid}", "Applications", true, null),
                ("GET", "/applications/", "Applications", true, null),
                ("POST", "/auth/register", "Auth", false, "auth"),
                ("POST", "/auth/login", "Auth", false, "auth"),
                ("POST", "/auth/logout", "Auth", true, null),
                ("GET", "/auth/me", "Auth", true, null),
                ("GET", "/settings/public-profile", "Settings", true, null),
                ("PATCH", "/settings/public-profile", "Settings", true, null),
                ("GET", "/status/{publicPageId:guid}", "Public Status", false, null)
            });

        var namedEndpoints = endpoints
            .Select(endpoint => endpoint.Metadata.GetMetadata<IEndpointNameMetadata>()?.EndpointName)
            .Where(name => name != null);
        namedEndpoints.Should().BeEquivalentTo(
            "CreateApplication", "GetApplication", "UpdateApplication", "DeleteApplication", "GetAllApplications");
    }

    [Fact]
    public async Task AddEndpoints_UsesDependencyInjection_AndSkipsAbstractAndOpenGenericTypes()
    {
        var builder = WebApplication.CreateBuilder();
        var dependency = new EndpointDependency();
        builder.Services.AddSingleton(dependency);
        builder.Services.AddEndpoints(typeof(EndpointRegistrationTests).Assembly);
        await using var app = builder.Build();

        var endpoint = app.Services.GetServices<IEndpoint>().Should().ContainSingle()
            .Which.Should().BeOfType<ProbeEndpoint>().Subject;
        endpoint.Dependency.Should().BeSameAs(dependency);

        app.MapEndpoints();
        var routes = ((IEndpointRouteBuilder)app).DataSources
            .SelectMany(source => source.Endpoints).Cast<RouteEndpoint>();
        routes.Should().ContainSingle().Which.RoutePattern.RawText.Should().Be("/probe");
    }

    public sealed class EndpointDependency;

    public sealed class ProbeEndpoint(EndpointDependency dependency) : IEndpoint
    {
        public EndpointDependency Dependency { get; } = dependency;

        public void MapEndpoint(IEndpointRouteBuilder app) =>
            app.MapGet("/probe", () => TypedResults.Ok());
    }

    public abstract class AbstractEndpoint : IEndpoint
    {
        public abstract void MapEndpoint(IEndpointRouteBuilder app);
    }

    public sealed class OpenGenericEndpoint<T> : IEndpoint
    {
        public void MapEndpoint(IEndpointRouteBuilder app) =>
            throw new InvalidOperationException("Open generic endpoints must not be registered.");
    }
}
