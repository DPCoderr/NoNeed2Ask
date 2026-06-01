using System.Security.Claims;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using NoNeed2Ask.Api.Database;

namespace NoNeed2Ask.Api.Features.Application;

public static class ApplicationList
{
    public static async Task<Results<Ok<List<ApplicationResponseDto>>, ProblemHttpResult>> Handle(
        AppDbContext dbContext,
        ClaimsPrincipal principal,
        CancellationToken cancellationToken
    )
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

        var applicationList = await dbContext.Applications
        .AsTracking()
        .Where(a => a.UserId == userId)
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
        .ToListAsync(cancellationToken);

        return TypedResults.Ok(applicationList);
    }
}