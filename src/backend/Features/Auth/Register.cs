using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using NoNeed2Ask.Api.Domain.Entities;

namespace NoNeed2Ask.Api.Features.Auth;

public static class Register
{
    public record RegisterRequest(string Username, string Email, string Password, bool RememberMe);
    public record RegisterResponseDto(Guid Id, string Username, string Email);

    public static async Task<Results<Ok<RegisterResponseDto>, ValidationProblem>> Handle(
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
            return TypedResults.ValidationProblem(
                errors: ToValidationErrors(result.Errors),
                title: "Registration failed",
                detail: "One or more registration fields are invalid.");
        }
        
        await  signInManager.SignInAsync(user, isPersistent: request.RememberMe);
        
        return TypedResults.Ok(new RegisterResponseDto(user.Id, user.UserName!, user.Email!));
    }

    private static Dictionary<string, string[]> ToValidationErrors(IEnumerable<IdentityError> errors)
    {
        return errors
            .GroupBy(error => GetValidationField(error.Code))
            .ToDictionary(
                group => group.Key,
                group => group.Select(error => error.Description).ToArray());
    }

    private static string GetValidationField(string code)
    {
        return code switch
        {
            "DuplicateEmail" or "InvalidEmail" => nameof(RegisterRequest.Email),
            "DuplicateUserName" or "InvalidUserName" => nameof(RegisterRequest.Username),
            "PasswordTooShort"
                or "PasswordRequiresUniqueChars"
                or "PasswordRequiresNonAlphanumeric"
                or "PasswordRequiresDigit"
                or "PasswordRequiresLower"
                or "PasswordRequiresUpper" => nameof(RegisterRequest.Password),
            _ => "General"
        };
    }
}
