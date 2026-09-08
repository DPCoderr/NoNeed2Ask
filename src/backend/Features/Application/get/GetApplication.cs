using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using NoNeed2Ask.Api.Database;
using NoNeed2Ask.Api.Shared;
using NoNeed2Ask.Api.Shared.Results;

namespace NoNeed2Ask.Api.Features.Application.get;

public class GetApplication
{
    private const string NameRequest = "GetApplication";

    private class Endpoint : IEndpoint
    {
        public void MapEndpoint(IEndpointRouteBuilder app)
        {
            app.MapGet("/applications/{id:guid}", Handler.Handle)
                .WithName(NameRequest)
                .RequireAuthorization();
        }
    }
    
    private record ApplicationResponseDto(
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
        public static async Task<Results<Ok<ApplicationResponseDto>, NotFound>> Handle(
            Guid id,
            AppDbContext db,
            CancellationToken cancellationToken)
        {
            var application = await db.Applications
                .AsNoTracking()
                .Where(a => a.Id == id)
                .Select(a => new ApplicationResponseDto(
                    a.Id,
                    a.CompanyName,
                    a.JobTitle,
                    a.Status,
                    a.PublicNote,
                    a.PrivateNote,
                    a.LastContactAt,
                    a.NextActionAt,
                    a.CreatedAt,
                    a.UpdatedAt
                ))
                .FirstOrDefaultAsync(cancellationToken);

            return application is null ? 
                TypedResults.NotFound() : 
                TypedResults.Ok(application);
        }
    }
}