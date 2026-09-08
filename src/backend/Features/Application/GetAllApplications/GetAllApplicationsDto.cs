namespace NoNeed2Ask.Api.Features.Application.GetAllApplications;

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