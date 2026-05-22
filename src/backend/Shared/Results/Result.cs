using NoNeed2Ask.Api.Shared.Errors;

namespace NoNeed2Ask.Api.Shared.Results;

public class Result
{
    protected Result(bool isSuccess, AppError? error)
    {
        IsSuccess = isSuccess;
        Error = error;
    }

    public bool IsSuccess { get; }

    public bool IsFailure => !IsSuccess;

    public AppError? Error { get; }

    public static Result Success() => new(true, null);

    public static Result Failure(AppError error) => new(false, error);
}
