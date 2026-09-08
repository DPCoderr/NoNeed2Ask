using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using NoNeed2Ask.Api.Database;
using NoNeed2Ask.Api.Domain.Entities;
using NoNeed2Ask.Api.Shared;

public class UpdateApplication
{
    private const string NameRequest = "UpdateApplication"; 

    private class Endpoint : IEndpoint
    {
        public void MapEndpoint(IEndpointRouteBuilder app)
        {
            app.MapPost("/applications", Handler.Handle)
                .WithName(NameRequest)
                .RequireAuthorization();
        }
    }

    private sealed record UpdateApplicationRequestDto(
    string CompanyName,
    string JobTitle,
    string Status,
    string? PublicNote,
    string? PrivateNote,
    DateTimeOffset? LastContactAt,
    DateTimeOffset? NextActionAt
    );

    private sealed record UpdateApplicationResponseDto(
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

    private static class Handler
    {
        public static async Task<Results<Ok<UpdateApplicationResponseDto>, NotFound>> Handle(
            Guid id,
            UpdateApplicationRequestDto request,
            AppDbContext db,
            CancellationToken cancellationToken)
        {
            var application = await db.Applications.FindAsync(id, cancellationToken);

            if (application is null)
            {
                return TypedResults.NotFound();
            }

            application.CompanyName = request.CompanyName;
            application.JobTitle = request.JobTitle;
            application.Status = request.Status;
            application.PublicNote = request.PublicNote;
            application.PrivateNote = request.PrivateNote;
            application.LastContactAt = request.LastContactAt;
            application.NextActionAt = request.NextActionAt;
            application.UpdatedAt = DateTimeOffset.UtcNow;
            
            await db.SaveChangesAsync(cancellationToken);

            var response = new UpdateApplicationResponseDto(
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
            
            return TypedResults.Ok(response);
        }
    }
}