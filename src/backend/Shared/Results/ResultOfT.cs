using NoNeed2Ask.Api.Shared.Errors;

namespace NoNeed2Ask.Api.Shared.Results;

public sealed class Result<T> : Result
{
    private Result(T? value, bool isSuccess, AppError? error)
        : base(isSuccess, error)
    {
        Value = value;
    }

    public T? Value { get; }

    public static Result<T> Success(T value) => new(value, true, null);

    public static new Result<T> Failure(AppError error) => new(default, false, error);
}
