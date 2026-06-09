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

public sealed record ApplicationListRequestDto
{
    public int? Page { get; init; }

    public string[]? Status { get; init; }

    public string? Search { get; init; }

    public string? SortBy { get; init; }

    public string? SortDirection { get; init; }
}

public record ApplicationListResponseDto(
    IReadOnlyList<ApplicationResponseDto> Items,
    int Page,
    int PageSize,
    int TotalItems,
    int TotalPages
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
