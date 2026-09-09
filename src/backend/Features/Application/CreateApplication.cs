using System.Security.Claims;
using FluentValidation;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using NoNeed2Ask.Api.Database;
using NoNeed2Ask.Api.Domain.Entities;
using NoNeed2Ask.Api.Shared;

namespace NoNeed2Ask.Api.Features.Application;

public static class CreateApplication
{
    public const string RouteName = nameof(CreateApplication);

    public sealed class Endpoint : IEndpoint
    {
        public void MapEndpoint(IEndpointRouteBuilder app)
        {
            app.MapPost("/applications/", Handler.Handle)
                .WithTags("Applications")
                .WithName(RouteName)
                .AddEndpointFilter<ValidationFilter<CreateApplicationRequestDto>>()
                .RequireAuthorization();
        }
    }

    public sealed record CreateApplicationRequestDto(
        string CompanyName,
        string JobTitle,
        string Status,
        string? PublicNote,
        string? PrivateNote,
        DateTimeOffset? LastContactAt,
        DateTimeOffset? NextActionAt
    );
    
    public sealed record CreateApplicationResponseDto(
        Guid Id,
        string CompanyName,
        string JobTitle,
        string Status,
        string? PublicNote,
        string? PrivateNote,
        DateTimeOffset? LastContactAt,
        DateTimeOffset? NextActionAt,
        DateTimeOffset CreatedAt,
        DateTimeOffset UpdatedAt
    );

    private static class Handler
    {
        public static async Task<Results<CreatedAtRoute<CreateApplicationResponseDto>, UnauthorizedHttpResult>> 
            Handle(
                CreateApplicationRequestDto request,
                UserManager<AppUser> userManager,
                ClaimsPrincipal user,
                AppDbContext db,
                CancellationToken cancellationToken)
        {
            var userIdString = userManager.GetUserId(user);
            
            if (!Guid.TryParse(userIdString, out var userId))
            {
                return TypedResults.Unauthorized();
            }
            
            var now = DateTimeOffset.UtcNow;
            var application = new Domain.Entities.Application()
            {
                UserId = userId,
                CompanyName = request.CompanyName,
                JobTitle = request.JobTitle,
                Status = request.Status,
                PublicNote = request.PublicNote,
                PrivateNote = request.PrivateNote,
                LastContactAt = request.LastContactAt,
                NextActionAt = request.NextActionAt,
                CreatedAt = now,
                UpdatedAt = now
            };
            
            db.Applications.Add(application);
            await db.SaveChangesAsync(cancellationToken);

            var response = new CreateApplicationResponseDto(
                application.Id,
                application.CompanyName,
                application.JobTitle,
                application.Status,
                application.PublicNote,
                application.PrivateNote,
                application.LastContactAt,
                application.NextActionAt,
                application.CreatedAt,
                application.UpdatedAt
            );
            
            return TypedResults.CreatedAtRoute(
                response,
                routeName: GetApplication.RouteName,
                routeValues: new { id = response.Id }
            );
        }
    }
    
    public sealed class CreateApplicationRequestDtoValidator : AbstractValidator<CreateApplicationRequestDto>
    {
        public CreateApplicationRequestDtoValidator()
        {
            RuleFor(x => x.CompanyName)
                .NotEmpty()
                .MaximumLength(200);

            RuleFor(x => x.JobTitle)
                .NotEmpty()
                .MaximumLength(200);

            RuleFor(x => x.Status)
                .NotEmpty()
                .MaximumLength(64)
                .Must(ApplicationStatuses.All.Contains)
                .WithMessage("Status must be one of: " + string.Join(", ", ApplicationStatuses.All));

            RuleFor(x => x.PublicNote)
                .MaximumLength(2000);

            RuleFor(x => x.PrivateNote)
                .MaximumLength(4000);
        }
    }
}
