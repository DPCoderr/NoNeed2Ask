namespace NoNeed2Ask.Api.Features.Applications;

public static class ApplicationEndpoints
{
    public static IEndpointRouteBuilder MapApplicationEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGroup("/applications")
            .WithTags("Applications");

        return app;
    }
}
