namespace NoNeed2Ask.Api.Features.PublicStatus;

public static class PublicStatusEndpoints
{
    public static IEndpointRouteBuilder MapPublicStatusEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGroup("/status")
            .WithTags("Public Status");

        return app;
    }
}
