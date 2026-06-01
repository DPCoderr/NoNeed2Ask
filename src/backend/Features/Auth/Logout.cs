using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using NoNeed2Ask.Api.Domain.Entities;

namespace NoNeed2Ask.Api.Features.Auth;

public static class Logout
{
    public static async Task<NoContent> Handle(SignInManager<AppUser> signInManager)
    {
        await signInManager.SignOutAsync();
        return TypedResults.NoContent();
    }
}