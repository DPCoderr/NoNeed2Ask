namespace NoNeed2Ask.Api.Features.PublicStatus;

public sealed record PublicStatusProfileDto(
    string PublicSlug,
    string DisplayName,
    bool IsPublicSharingEnabled,
    DateTimeOffset UpdatedAt);

public sealed record PublicStatusApplicationDto(
    string CompanyName,
    string JobTitle,
    string Status,
    string? PublicNote,
    DateTimeOffset UpdatedAt,
    DateTimeOffset? NextActionAt);

public sealed record PublicStatusEnabledResponseDto(
    string Kind,
    PublicStatusProfileDto Profile,
    IReadOnlyList<PublicStatusApplicationDto> Applications);

public sealed record PublicStatusDisabledResponseDto(
    string Kind,
    string Message);
