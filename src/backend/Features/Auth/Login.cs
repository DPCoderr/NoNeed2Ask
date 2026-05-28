using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using NoNeed2Ask.Api.Domain.Entities;

namespace NoNeed2Ask.Api.Features.Auth;

public static class Login
{
    public record LoginRequestDto(string Email, string Password);
    public record LoginResponseDto(Guid Id, string Username, string Email);

    public static async Task<Results<Ok<LoginResponseDto>, ProblemHttpResult>> Handle(
        LoginRequestDto request,
        UserManager<AppUser> userManager,
        SignInManager<AppUser> signInManager)
    {
        var user = await userManager.FindByEmailAsync(request.Email);

        if (user == null)
        {
            return TypedResults.Problem(
                    title: "Unauthorized",
                    detail: "Incorrect email or password",
                    statusCode: 401
            );
        }

        var result = await signInManager.PasswordSignInAsync(
            user, 
            request.Password, 
            isPersistent: true,
            lockoutOnFailure: true
            );


        if (!result.Succeeded)
        {
            return TypedResults.Problem(
                title: "Unauthorized",
                detail: "Incorrect email or password",
                statusCode: 401
            );
        }
        
        return TypedResults.Ok(new LoginResponseDto(user.Id, user.UserName!, user.Email!));
    }
}