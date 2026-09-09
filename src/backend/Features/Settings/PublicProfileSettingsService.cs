using Microsoft.EntityFrameworkCore;
using NoNeed2Ask.Api.Database;
using NoNeed2Ask.Api.Domain.Entities;

namespace NoNeed2Ask.Api.Features.Settings;

public static class PublicProfileSettingsService
{
    public static async Task<PublicProfileSettings?> GetOrCreateAsync(
        AppDbContext dbContext,
        Guid userId,
        CancellationToken cancellationToken)
    {
        var settings = await dbContext.PublicProfileSettings
            .FirstOrDefaultAsync(x => x.UserId == userId, cancellationToken);

        if (settings is not null)
        {
            return settings;
        }

        if (!await dbContext.Users.AnyAsync(x => x.Id == userId, cancellationToken))
        {
            return null;
        }

        settings = CreateDefault(dbContext, userId);
        await dbContext.SaveChangesAsync(cancellationToken);
        return settings;
    }

    public static PublicProfileSettings CreateDefault(AppDbContext dbContext, Guid userId)
    {
        var now = DateTimeOffset.UtcNow;
        var settings = new PublicProfileSettings
        {
            UserId = userId,
            IsPublicSharingEnabled = false,
            CreatedAt = now,
            UpdatedAt = now
        };

        dbContext.PublicProfileSettings.Add(settings);
        return settings;
    }

    public static PublicProfileSettingsDto ToDto(PublicProfileSettings settings)
    {
        return new PublicProfileSettingsDto(
            settings.UserId,
            settings.PublicPageId,
            settings.IsPublicSharingEnabled,
            settings.CreatedAt,
            settings.UpdatedAt);
    }
}
