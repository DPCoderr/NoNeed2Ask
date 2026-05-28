namespace NoNeed2Ask.Api.Domain.Entities;

public sealed class Application
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public Guid UserId { get; set; }

    public string CompanyName { get; set; } = string.Empty;

    public string JobTitle { get; set; } = string.Empty;

    public string Status { get; set; } = string.Empty;

    public string? PublicNote { get; set; }

    public string? PrivateNote { get; set; }

    public DateTimeOffset? LastContactAt { get; set; }

    public DateTimeOffset? NextActionAt { get; set; }

    public DateTimeOffset CreatedAt { get; set; }

    public DateTimeOffset UpdatedAt { get; set; }

    public AppUser User { get; set; } = null!;
}
