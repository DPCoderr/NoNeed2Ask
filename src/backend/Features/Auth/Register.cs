using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using NoNeed2Ask.Api.Domain.Entities;

namespace NoNeed2Ask.Api.Features.Auth;

public static class Register
{
    public record RegisterRequest(string Username, string Email, string Password);
    public record RegisterResponse(string AccessToken, string RefreshToken);

    public static async Task<Results<Ok<RegisterResponse>, BadRequest<IEnumerable<IdentityError>>>> Handle(
        RegisterRequest request, 
        UserManager<AppUser> userManager
        )
    {
        var user = new AppUser()
        {
            UserName = request.Username,
            Email = request.Email,
        };
        
        var result = await userManager.CreateAsync(user, request.Password);
        
        if (!result.Succeeded)
        {
            return TypedResults.BadRequest(result.Errors);
        }
        
        var response = new RegisterResponse("AccessToken", "RefreshToken");

        
        
        return TypedResults.Ok(response);
    }
}