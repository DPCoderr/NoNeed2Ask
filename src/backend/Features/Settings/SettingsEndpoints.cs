namespace NoNeed2Ask.Api.Features.Settings;

public static class SettingsEndpoints
{
    public static IEndpointRouteBuilder MapSettingsEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/settings")
            .WithTags("Settings");

        group.MapGet("/public-profile", PublicProfileSettingsGet.Handle)
            .RequireAuthorization();

        group.MapPatch("/public-profile", PublicProfileSettingsUpdate.Handle)
            .RequireAuthorization();

        return app;
    }
}
