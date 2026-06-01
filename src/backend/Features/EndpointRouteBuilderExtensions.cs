using NoNeed2Ask.Api.Features.Application;
using NoNeed2Ask.Api.Features.Auth;
using NoNeed2Ask.Api.Features.PublicStatus;
using NoNeed2Ask.Api.Features.Settings;

namespace NoNeed2Ask.Api.Features;

public static class EndpointRouteBuilderExtensions
{
    public static IEndpointRouteBuilder MapFeatureEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapAuthEndpoints();
        app.MapApplicationEndpoints();
        app.MapSettingsEndpoints();
        app.MapPublicStatusEndpoints();

        return app;
    }
}
