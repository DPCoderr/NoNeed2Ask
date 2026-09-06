using Microsoft.AspNetCore.Http.HttpResults;
using NoNeed2Ask.Api.Database;
using NoNeed2Ask.Api.Shared;

namespace NoNeed2Ask.Api.Features.Application.create;

public class ApplicationCreate
{
    private sealed record ApplicationCreateRequestDto(
        string CompanyName,
        string JobTitle,
        string Status,
        string? PublicNote,
        string? PrivateNote,
        DateTimeOffset? LastContactAt,
        DateTimeOffset? NextActionAt
    );
    
    private sealed record ApplicationCreateResponseDto(
        Guid Id,
        string CompanyName,
        string JobTitle,
        string Status,
        string? PublicNote,
        string? PrivateNote,
        DateTimeOffset? LastContactAt,
        DateTimeOffset? NextActionAt,
        DateTimeOffset CreatedAt,
        DateTimeOffset UpdatedAt
    );

    private class Endpoint : IEndpoint
    {
        public void MapEndpoint(IEndpointRouteBuilder app)
        {
            app.MapPost("/applications", Handler.Handle)
                .WithName("CreateApplication")
                .RequireAuthorization();
        }
    }

    private static class Handler
    {
        public static async Task<CreatedAtRoute<ApplicationCreateResponseDto>> Handle(
            ApplicationCreateRequestDto request,
            AppDbContext db,
            CancellationToken cancellationToken)
        {
            var application = new Domain.Entities.Application()
            {
                CompanyName = request.CompanyName,
                JobTitle = request.JobTitle,
                Status = request.Status,
                PublicNote = request.PublicNote,
                PrivateNote = request.PrivateNote,
                LastContactAt = request.LastContactAt,
                NextActionAt = request.NextActionAt,
                CreatedAt = DateTimeOffset.UtcNow,
                UpdatedAt = DateTimeOffset.UtcNow
            };
            
            db.Applications.Add(application);
            await db.SaveChangesAsync(cancellationToken);

            var response = new ApplicationCreateResponseDto(
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
                routeName: "GetApplication",
                routeValues: new { id = response.Id }
            );
        }
    }
}