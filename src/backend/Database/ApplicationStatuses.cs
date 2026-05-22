namespace NoNeed2Ask.Api.Database;

public static class ApplicationStatuses
{
    public const string Applied = "applied";
    public const string WaitingResponse = "waiting_response";
    public const string InterviewPlanned = "interview_planned";
    public const string InterviewDone = "interview_done";
    public const string Offer = "offer";
    public const string Rejected = "rejected";
    public const string Ghosted = "ghosted";
    public const string Paused = "paused";

    public static readonly string[] All =
    [
        Applied,
        WaitingResponse,
        InterviewPlanned,
        InterviewDone,
        Offer,
        Rejected,
        Ghosted,
        Paused
    ];
}
