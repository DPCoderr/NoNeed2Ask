using System.Security.Claims;
using FluentValidation;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using NoNeed2Ask.Api.Database;
using NoNeed2Ask.Api.Domain.Entities;
using NoNeed2Ask.Api.Shared;

namespace NoNeed2Ask.Api.Features.Application;

public static class UpdateApplication
{
    public const string RouteName = nameof(UpdateApplication);

    public sealed class Endpoint : IEndpoint
    {
        public void MapEndpoint(IEndpointRouteBuilder app)
        {
            app.MapPut("/applications/{id:guid}", Handler.Handle)
                .WithTags("Applications")
                .WithName(RouteName)
                .AddEndpointFilter<ValidationFilter<UpdateApplicationRequestDto>>()
                .RequireAuthorization();
        }
    }

    public sealed record UpdateApplicationRequestDto(
        string CompanyName,
        string JobTitle,
        string Status,
        string? PublicNote,
        string? PrivateNote,
        DateTimeOffset? LastContactAt,
        DateTimeOffset? NextActionAt
    );

    private static class Handler
    {
        public static async Task<Results<NoContent, UnauthorizedHttpResult, NotFound>> Handle(
            Guid id,
            ClaimsPrincipal user,
            UserManager<AppUser> userManager,
            UpdateApplicationRequestDto request,
            AppDbContext db,
            CancellationToken cancellationToken)
        {
            var userIdString = userManager.GetUserId(user);
            
            if (!Guid.TryParse(userIdString, out var userId))
            {
                return TypedResults.Unauthorized();
            }

            var application = await db.Applications
                .Where(a => a.Id == id && a.UserId == userId)
                .FirstOrDefaultAsync(cancellationToken);

            if (application is null)
            {
                return TypedResults.NotFound();
            }

            application.CompanyName = request.CompanyName;
            application.JobTitle = request.JobTitle;
            application.Status = request.Status;
            application.PublicNote = request.PublicNote;
            application.PrivateNote = request.PrivateNote;
            application.LastContactAt = request.LastContactAt;
            application.NextActionAt = request.NextActionAt;
            application.UpdatedAt = DateTimeOffset.UtcNow;
            
            await db.SaveChangesAsync(cancellationToken);

            return TypedResults.NoContent();
        }
    }
    
    public sealed class UpdateApplicationRequestDtoValidator : AbstractValidator<UpdateApplicationRequestDto>
    {
        public UpdateApplicationRequestDtoValidator()
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
