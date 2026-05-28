using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using NoNeed2Ask.Api.Domain.Entities;

namespace NoNeed2Ask.Api.Features.Auth;

public static class Login
{
    public record LoginRequest(string Email, string Password);
    public record LoginResponse(string AccessToken);

    public static async Task<Results<Ok<LoginResponse>, ProblemHttpResult>> Handle(
        LoginRequest loginRequest,
        UserManager<AppUser> userManager,
        SignInManager<AppUser> signInManager)
    {
        var user = await userManager.FindByEmailAsync(loginRequest.Email);

        if (user == null)
        {
            return TypedResults.Problem(
                    title: "Unauthorized",
                    detail: "Incorrect email or password",
                    statusCode: 401
            );
        }

        var result = await signInManager.CheckPasswordSignInAsync(
            user, 
            loginRequest.Password, 
            true);

        if (!result.Succeeded)
        {
            return TypedResults.Problem(
                title: "Unauthorized",
                detail: "Incorrect email or password",
                statusCode: 401
            );
        }
        
        var accessToken = new LoginResponse("AccessToken");
        
        return TypedResults.Ok(accessToken);
    }
}