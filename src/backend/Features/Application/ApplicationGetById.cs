using System.Security.Claims;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using NoNeed2Ask.Api.Database;

namespace NoNeed2Ask.Api.Features.Application;

public static class ApplicationGetById
{
    public static async Task<Results<Ok<ApplicationResponseDto>, ProblemHttpResult, NotFound>> Handle(
        Guid id,
        AppDbContext dbContext,
        ClaimsPrincipal principal,
        CancellationToken cancellationToken)
    {
        var userIdString = principal.FindFirstValue(ClaimTypes.NameIdentifier);

        if (!Guid.TryParse(userIdString, out var userId))
        {
            return TypedResults.Problem(
                title: "Unauthorized",
                detail: "You must be logged in to see this page",
                statusCode: 401
            );
        }

        var application = await dbContext.Applications
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

        return application is null 
        ? TypedResults.NotFound()
        : TypedResults.Ok(application);
    }
}