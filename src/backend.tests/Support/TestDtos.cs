namespace NoNeed2Ask.Api.Tests.Support;

public sealed record AuthUserResponse(Guid Id, string Username, string Email);

public sealed record TestApplicationRequest(
    string CompanyName,
    string JobTitle,
    string Status,
    string? PublicNote,
    string? PrivateNote,
    DateTimeOffset? LastContactAt,
    DateTimeOffset? NextActionAt);

public sealed record TestApplicationResponse(
    Guid Id,
    string CompanyName,
    string JobTitle,
    string Status,
    string? PublicNote,
    string? PrivateNote,
    DateTimeOffset? LastContactAt,
    DateTimeOffset? NextActionAt,
    DateTimeOffset CreatedAt,
    DateTimeOffset UpdatedAt);

public sealed record TestApplicationListResponse(
    List<TestApplicationResponse> Items,
    int Page,
    int PageSize,
    int TotalItems,
    int TotalPages);

public sealed record TestUser(
    HttpClient Client,
    Guid Id,
    string Username,
    string Email,
    string Password);
