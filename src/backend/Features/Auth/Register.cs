using FluentValidation;
using NoNeed2Ask.Api.Shared;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using NoNeed2Ask.Api.Database;
using NoNeed2Ask.Api.Domain.Entities;
using NoNeed2Ask.Api.Features.Settings;

namespace NoNeed2Ask.Api.Features.Auth;

public static class Register
{
    public sealed class Endpoint : IEndpoint
    {
        public void MapEndpoint(IEndpointRouteBuilder app)
        {
            app.MapPost("/auth/register", Handler.Handle)
                .WithTags("Auth")
                .AddEndpointFilter<ValidationFilter<RegisterRequest>>()
                .RequireRateLimiting("auth");
        }
    }

    public record RegisterRequest(string Username, string Email, string Password, bool RememberMe);
    public record RegisterResponseDto(Guid Id, string Username, string Email);

    private static class Handler
    {
        public static async Task<Results<Ok<RegisterResponseDto>, ValidationProblem>> Handle(
            RegisterRequest request,
            UserManager<AppUser> userManager,
            SignInManager<AppUser> signInManager,
            AppDbContext dbContext,
            CancellationToken cancellationToken)
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

            PublicProfileSettingsService.CreateDefault(dbContext, user.Id);
            await dbContext.SaveChangesAsync(cancellationToken);

            await signInManager.SignInAsync(user, isPersistent: request.RememberMe);

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

    public sealed class RegisterRequestValidator : AbstractValidator<RegisterRequest>
    {
        public RegisterRequestValidator()
        {
            RuleFor(x => x.Username)
                .NotEmpty()
                .WithMessage("Username is required.")
                .MaximumLength(256)
                .WithMessage("Username must be 256 characters or fewer.");

            RuleFor(x => x.Email)
                .NotEmpty()
                .WithMessage("Email is required.")
                .EmailAddress()
                .WithMessage("Enter a valid email address.");

            RuleFor(x => x.Password)
                .NotEmpty()
                .WithMessage("Password is required.")
                .MinimumLength(6)
                .WithMessage("Password must be at least 6 characters.")
                .Matches("[0-9]")
                .WithMessage("Password must contain at least one number.")
                .Matches("[a-z]")
                .WithMessage("Password must contain at least one lowercase letter.")
                .Matches("[A-Z]")
                .WithMessage("Password must contain at least one uppercase letter.")
                .Matches("[^a-zA-Z0-9]")
                .WithMessage("Password must contain at least one special character.");
        }
    }
}
