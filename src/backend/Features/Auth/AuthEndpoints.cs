namespace NoNeed2Ask.Api.Features.Auth;

public static class AuthEndpoints
{
    public static IEndpointRouteBuilder MapAuthEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/auth")
            .WithTags("Auth");

        group.MapPost("/register", Register.Handle);
        group.MapPost("/login", Login.Handle);
        
        return app;
    }
}
