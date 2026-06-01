namespace NoNeed2Ask.Api.Features.Application;

public record CreateApplicationRequestDto(
    string CompanyName,
    string JobTitle,
    string Status,
    string? PublicNote,
    string? PrivateNote,
    DateTimeOffset? LastContactAt,
    DateTimeOffset? NextActionAt
);

public record UpdateApplicationRequestDto(
    string CompanyName,
    string JobTitle,
    string Status,
    string? PublicNote,
    string? PrivateNote,
    DateTimeOffset? LastContactAt,
    DateTimeOffset? NextActionAt
);

public record ApplicationResponseDto(
    Guid Id,
    string CompanyName,
    string JobTitle,
    string Status,
    string? PublicNote,
    string? PrivateNote,
    DateTimeOffset? LastContactAt,
    DateTimeOffset? NextActionAt,
    DateTimeOffset CreatedAt,
    DateTimeOffset UpdatedAt
);

public record PublicApplicationResponseDto(
    Guid Id,
    string CompanyName,
    string JobTitle,
    string Status,
    string? PublicNote,
    DateTimeOffset? LastContactAt,
    DateTimeOffset? NextActionAt,
    DateTimeOffset UpdatedAt
);
