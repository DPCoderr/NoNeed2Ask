using System.Security.Claims;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using NoNeed2Ask.Api.Domain.Entities;

namespace NoNeed2Ask.Api.Features.Auth;

public static class Me
{
    public record MeResponseDto(Guid Id, string Username, string Email);

    public static async Task<Results<Ok<MeResponseDto>, ProblemHttpResult>> Handle(
        ClaimsPrincipal principal,
        UserManager<AppUser> userManager
    )
    {
        var user = await userManager.GetUserAsync(principal);

        if (user is null)
        {
            TypedResults.Problem(
                title: "Unauthorized",
                detail: "You are not authorized to view this page.",
                statusCode: 401
                );
        }
        
        return TypedResults.Ok(new MeResponseDto(user.Id, user.UserName!, user.Email!));
    }
}