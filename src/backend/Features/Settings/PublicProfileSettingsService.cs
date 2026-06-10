using System.Text.RegularExpressions;
using Microsoft.EntityFrameworkCore;
using NoNeed2Ask.Api.Database;
using NoNeed2Ask.Api.Domain.Entities;

namespace NoNeed2Ask.Api.Features.Settings;

public static partial class PublicProfileSettingsService
{
    private const int MaxSlugLength = 100;

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

        var user = await dbContext.Users
            .AsNoTracking()
            .Where(x => x.Id == userId)
            .Select(x => new { x.Id, x.UserName })
            .SingleOrDefaultAsync(cancellationToken);

        if (user is null)
        {
            return null;
        }

        settings = await CreateDefaultAsync(
            dbContext,
            user.Id,
            user.UserName ?? "user",
            cancellationToken);

        await dbContext.SaveChangesAsync(cancellationToken);

        return settings;
    }

    public static async Task<PublicProfileSettings> CreateDefaultAsync(
        AppDbContext dbContext,
        Guid userId,
        string username,
        CancellationToken cancellationToken)
    {
        var now = DateTimeOffset.UtcNow;
        var settings = new PublicProfileSettings
        {
            UserId = userId,
            PublicSlug = await CreateUniqueSlugAsync(
                dbContext,
                username,
                userId,
                cancellationToken),
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
            settings.PublicSlug,
            settings.IsPublicSharingEnabled,
            settings.CreatedAt,
            settings.UpdatedAt);
    }

    private static async Task<string> CreateUniqueSlugAsync(
        AppDbContext dbContext,
        string username,
        Guid userId,
        CancellationToken cancellationToken)
    {
        var baseSlug = TrimSlug($"{Slugify(username)}-job-search", MaxSlugLength);
        var baseSlugExists = await SlugExistsAsync(
            dbContext,
            baseSlug,
            userId,
            cancellationToken);

        if (!baseSlugExists)
        {
            return baseSlug;
        }

        var suffix = userId.ToString("N")[..8];
        var suffixedBase = TrimSlug(baseSlug, MaxSlugLength - suffix.Length - 1);

        return $"{suffixedBase}-{suffix}";
    }

    private static async Task<bool> SlugExistsAsync(
        AppDbContext dbContext,
        string publicSlug,
        Guid userId,
        CancellationToken cancellationToken)
    {
        return await dbContext.PublicProfileSettings
            .AsNoTracking()
            .AnyAsync(
                x => x.PublicSlug == publicSlug && x.UserId != userId,
                cancellationToken);
    }

    private static string Slugify(string value)
    {
        var slug = NonSlugCharacterPattern()
            .Replace(value.Trim().ToLowerInvariant(), "-")
            .Trim('-');

        return string.IsNullOrWhiteSpace(slug) ? "user" : slug;
    }

    private static string TrimSlug(string value, int maxLength)
    {
        return value.Length <= maxLength
            ? value
            : value[..maxLength].Trim('-');
    }

    [GeneratedRegex("[^a-z0-9]+")]
    private static partial Regex NonSlugCharacterPattern();
}
