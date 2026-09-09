using System.Security.Claims;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using NoNeed2Ask.Api.Database;
using NoNeed2Ask.Api.Domain.Entities;
using NoNeed2Ask.Api.Shared;

namespace NoNeed2Ask.Api.Features.Application;

public static class GetApplication
{
    public const string RouteName = nameof(GetApplication);

    public sealed class Endpoint : IEndpoint
    {
        public void MapEndpoint(IEndpointRouteBuilder app)
        {
            app.MapGet("/applications/{id:guid}", Handler.Handle)
                .WithTags("Applications")
                .WithName(RouteName)
                .RequireAuthorization();
        }
    }
    
    private record ApplicationResponseDto(
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
        public static async Task<Results<Ok<ApplicationResponseDto>, UnauthorizedHttpResult, NotFound>> Handle(
            Guid id,
            ClaimsPrincipal user,
            UserManager<AppUser> userManager,
            AppDbContext db,
            CancellationToken cancellationToken)
        {
            var userIdString = userManager.GetUserId(user);

            if (!Guid.TryParse(userIdString, out var userId))
            {
                return TypedResults.Unauthorized();
            }
            
            var application = await db.Applications
                .AsNoTracking()
                .Where(a => a.Id == id && a.UserId == userId)
                .Select(a => new ApplicationResponseDto(
                    a.Id,
                    a.CompanyName,
                    a.JobTitle,
                    a.Status,
                    a.PublicNote,
                    a.PrivateNote,
                    a.LastContactAt,
                    a.NextActionAt,
                    a.CreatedAt,
                    a.UpdatedAt
                ))
                .FirstOrDefaultAsync(cancellationToken);

            return application is null ? 
                TypedResults.NotFound() :
                TypedResults.Ok(application);
        }
    }
}
