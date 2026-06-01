using System.Security.Claims;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using NoNeed2Ask.Api.Database;

namespace NoNeed2Ask.Api.Features.Application;

public static class ApplicationUpdate
{
    public static async Task<Results<NoContent, ProblemHttpResult, NotFound>> Handle(
        Guid id,
        UpdateApplicationRequestDto request,
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

        var application = await dbContext.Applications
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

        await dbContext.SaveChangesAsync(cancellationToken);
        
        return TypedResults.NoContent();
    }
}