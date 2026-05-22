namespace NoNeed2Ask.Api.Features.Settings;

public static class SettingsEndpoints
{
    public static IEndpointRouteBuilder MapSettingsEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGroup("/settings")
            .WithTags("Settings");

        return app;
    }
}
