namespace NoNeed2Ask.Api.Domain.Entities;

public static class ApplicationStatuses
{
    public const string Applied = "applied";
    public const string InterviewPlanned = "interview_planned";
    public const string InterviewDone = "interview_done";
    public const string Offer = "offer";
    public const string Rejected = "rejected";
    public const string Paused = "paused";

    public static readonly string[] All =
    [
        Applied,
        InterviewPlanned,
        InterviewDone,
        Offer,
        Rejected,
        Paused
    ];
}
