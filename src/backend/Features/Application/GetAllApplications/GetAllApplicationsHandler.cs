using Microsoft.AspNetCore.Http.HttpResults;
using NoNeed2Ask.Api.Database;

namespace NoNeed2Ask.Api.Features.Application.GetAllApplications;

public static class GetAllApplicationsHandler
{
    public static async Task<Ok> Handle(
        AppDbContext db,
        CancellationToken cancellationToken
    )
    {
        return TypedResults.Ok();
    }
}