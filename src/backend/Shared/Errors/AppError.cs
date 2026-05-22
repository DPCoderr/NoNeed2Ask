namespace NoNeed2Ask.Api.Shared.Errors;

public sealed record AppError(string Code, string Description, int StatusCode);
