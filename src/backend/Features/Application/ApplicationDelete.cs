using System.Security.Claims;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using NoNeed2Ask.Api.Database;

namespace NoNeed2Ask.Api.Features.Application;

public static class ApplicationDelete
{
    public static async Task<Results<NoContent, ProblemHttpResult, NotFound>> Handle(
        Guid id,
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

        dbContext.Applications.Remove(application);
        await dbContext.SaveChangesAsync(cancellationToken);

        return TypedResults.NoContent();
    }
}