using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using NoNeed2Ask.Api.Database;

namespace NoNeed2Ask.Api.Features.PublicStatus;

public static class PublicStatusGet
{
    private const string PrivateMessage = "This status page is currently private.";

    public static async Task<Results<
        Ok<PublicStatusEnabledResponseDto>,
        Ok<PublicStatusDisabledResponseDto>,
        NotFound>> Handle(
        string slug,
        AppDbContext dbContext,
        CancellationToken cancellationToken)
    {
        var profile = await dbContext.PublicProfileSettings
            .AsNoTracking()
            .Where(settings => settings.PublicSlug == slug)
            .Select(settings => new
            {
                settings.UserId,
                settings.PublicSlug,
                settings.IsPublicSharingEnabled,
                settings.UpdatedAt,
                DisplayName = settings.User.UserName ?? "Job search"
            })
            .SingleOrDefaultAsync(cancellationToken);

        if (profile is null)
        {
            return TypedResults.NotFound();
        }

        if (!profile.IsPublicSharingEnabled)
        {
            return TypedResults.Ok(new PublicStatusDisabledResponseDto(
                "disabled",
                PrivateMessage));
        }

        var applications = await dbContext.Applications
            .AsNoTracking()
            .Where(application => application.UserId == profile.UserId)
            .OrderByDescending(application => application.UpdatedAt)
            .ThenBy(application => application.Id)
            .Select(application => new PublicStatusApplicationDto(
                application.CompanyName,
                application.JobTitle,
                application.Status,
                application.PublicNote,
                application.UpdatedAt,
                application.NextActionAt))
            .ToListAsync(cancellationToken);

        var response = new PublicStatusEnabledResponseDto(
            "enabled",
            new PublicStatusProfileDto(
                profile.PublicSlug,
                profile.DisplayName,
                true,
                profile.UpdatedAt),
            applications);

        return TypedResults.Ok(response);
    }
}
