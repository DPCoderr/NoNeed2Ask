using NoNeed2Ask.Api.Shared;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using NoNeed2Ask.Api.Domain.Entities;

namespace NoNeed2Ask.Api.Features.Auth;

public static class Logout
{
    public sealed class Endpoint : IEndpoint
    {
        public void MapEndpoint(IEndpointRouteBuilder app)
        {
            app.MapPost("/logout", Handler.Handle)
                .RequireAuthorization();
        }
    }

    private static class Handler
    {
        public static async Task<NoContent> Handle(SignInManager<AppUser> signInManager)
        {
            await signInManager.SignOutAsync();
            return TypedResults.NoContent();
        }
    }
}
