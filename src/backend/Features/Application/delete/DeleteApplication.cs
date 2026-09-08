using Microsoft.AspNetCore.Http.HttpResults;
using NoNeed2Ask.Api.Database;
using NoNeed2Ask.Api.Shared;

public class DeleteApplication
{
    private const string NameRequest = "DeleteApplication"; 

    private class Endpoint : IEndpoint
    {
        public void MapEndpoint(IEndpointRouteBuilder app)
        {
            app.MapDelete("/applications", Handler.Handle)
                .WithName(NameRequest)
                .RequireAuthorization();
        }
    }

    private static class Handler
    {
        public static async Task<Results<NoContent, NotFound>> Handle(
            Guid id,
            AppDbContext db,
            CancellationToken cancellationToken)
        {
            var application = await db.Applications.FindAsync(id, cancellationToken);

            if (application is null)
            {
                return TypedResults.NotFound();
            }

			db.Applications.Remove(application);
			await db.SaveChangesAsync(cancellationToken);
            
            return TypedResults.NoContent();
        }
    }
}