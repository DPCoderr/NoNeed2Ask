namespace NoNeed2Ask.Api.Domain.Entities;

public sealed class PublicProfileSettings
{
    public Guid UserId { get; set; }

    public Guid PublicPageId { get; set; } = Guid.NewGuid();

    public bool IsPublicSharingEnabled { get; set; }

    public DateTimeOffset CreatedAt { get; set; }

    public DateTimeOffset UpdatedAt { get; set; }

    public AppUser User { get; set; } = null!;
}
