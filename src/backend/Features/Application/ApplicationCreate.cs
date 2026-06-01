using System.Security.Claims;
using Microsoft.AspNetCore.Http.HttpResults;
using NoNeed2Ask.Api.Database;

namespace NoNeed2Ask.Api.Features.Application;

public static class ApplicationCreate
{
    public static async Task<Results<CreatedAtRoute<ApplicationResponseDto>, ProblemHttpResult>> Handle(
        CreateApplicationRequestDto request,
        AppDbContext dbContext,
        ClaimsPrincipal principal,
        CancellationToken cancellationToken)
    {
        var userIdString = principal.FindFirstValue(ClaimTypes.NameIdentifier);

        if (!Guid.TryParse(userIdString, out var userId))
        {
            return TypedResults.Problem(
                title: "Unauthorized",
                detail: "You must be logged in to see this page",
                statusCode: 401
            );
        }

        var application = new Domain.Entities.Application()
        {
            UserId = userId,
            CompanyName = request.CompanyName,
            JobTitle =  request.JobTitle,
            Status =  request.Status,
            PublicNote =  request.PublicNote,
            PrivateNote =   request.PrivateNote,
            LastContactAt =   request.LastContactAt,
            NextActionAt =    request.NextActionAt,
        };
            
        dbContext.Applications.Add(application);
        await dbContext.SaveChangesAsync(cancellationToken);

        var response = new ApplicationResponseDto(
            application.Id,
            application.CompanyName,
            application.JobTitle,
            application.Status,
            application.PublicNote,
            application.PrivateNote,
            application.LastContactAt,
            application.NextActionAt,
            application.CreatedAt,
            application.UpdatedAt
        );

        return TypedResults.CreatedAtRoute(
            response,
            ApplicationEndpoints.GetByIdRouteName,
            new { id = application.Id });
    }
}
