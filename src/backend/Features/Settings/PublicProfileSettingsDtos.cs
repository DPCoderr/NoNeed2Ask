namespace NoNeed2Ask.Api.Features.Settings;

public sealed record PublicProfileSettingsDto(
    Guid UserId,
    string PublicSlug,
    bool IsPublicSharingEnabled,
    DateTimeOffset CreatedAt,
    DateTimeOffset UpdatedAt);

public sealed record UpdatePublicProfileSettingsRequestDto(
    bool IsPublicSharingEnabled);
