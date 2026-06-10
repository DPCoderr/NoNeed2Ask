using System.Security.Claims;
using Microsoft.AspNetCore.Http.HttpResults;
using NoNeed2Ask.Api.Database;

namespace NoNeed2Ask.Api.Features.Settings;

public static class PublicProfileSettingsGet
{
    public static async Task<Results<Ok<PublicProfileSettingsDto>, ProblemHttpResult>> Handle(
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
                statusCode: 401);
        }

        var settings = await PublicProfileSettingsService.GetOrCreateAsync(
            dbContext,
            userId,
            cancellationToken);

        if (settings is null)
        {
            return TypedResults.Problem(
                title: "Unauthorized",
                detail: "You must be logged in to see this page",
                statusCode: 401);
        }

        return TypedResults.Ok(PublicProfileSettingsService.ToDto(settings));
    }
}
