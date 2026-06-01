namespace NoNeed2Ask.Api.Features.Applications;

public static class ApplicationEndpoints
{
    public static IEndpointRouteBuilder MapApplicationEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/applications")
            .WithTags("Applications");

        group.MapGet("{id}", );
        group.MapGet("/", );
        group.MapPost("/{id}", );
        group.MapPut("/{id}", );
        group.MapDelete("/{id}", );

        return app;
    }
}
