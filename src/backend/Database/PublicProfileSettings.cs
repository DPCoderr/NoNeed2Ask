namespace NoNeed2Ask.Api.Database;

public sealed class PublicProfileSettings
{
    public Guid UserId { get; set; }

    public string PublicSlug { get; set; } = string.Empty;

    public bool IsPublicSharingEnabled { get; set; }

    public DateTimeOffset CreatedAt { get; set; }

    public DateTimeOffset UpdatedAt { get; set; }

    public AppUser User { get; set; } = null!;
}
