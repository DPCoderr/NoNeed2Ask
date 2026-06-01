using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using NoNeed2Ask.Api.Domain.Entities;

namespace NoNeed2Ask.Api.Features.Auth;

public static class Register
{
    public record RegisterRequest(string Username, string Email, string Password, bool RememberMe);
    public record RegisterResponseDto(Guid Id, string Username, string Email);

    public static async Task<Results<Ok<RegisterResponseDto>, BadRequest<IEnumerable<IdentityError>>>> Handle(
        RegisterRequest request, 
        UserManager<AppUser> userManager,
        SignInManager<AppUser> signInManager)
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
        
        await  signInManager.SignInAsync(user, isPersistent: request.RememberMe);
        
        return TypedResults.Ok(new RegisterResponseDto(user.Id, user.UserName!, user.Email!));
    }
}