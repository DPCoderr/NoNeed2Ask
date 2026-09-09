namespace NoNeed2Ask.Api.Features.Auth;

public static class AuthEndpoints
{
    public static IEndpointRouteBuilder MapAuthEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/auth")
            .WithTags("Auth");

        new Register.Endpoint().MapEndpoint(group);
        new Login.Endpoint().MapEndpoint(group);
        new Logout.Endpoint().MapEndpoint(group);
        new Me.Endpoint().MapEndpoint(group);

        return app;
    }
}
