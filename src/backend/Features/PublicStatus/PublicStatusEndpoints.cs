namespace NoNeed2Ask.Api.Features.PublicStatus;

public static class PublicStatusEndpoints
{
    public static IEndpointRouteBuilder MapPublicStatusEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/status")
            .WithTags("Public Status");

        group.MapGet("/{slug}", PublicStatusGet.Handle);

        return app;
    }
}
