using System.Security.Claims;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using NoNeed2Ask.Api.Database;
using NoNeed2Ask.Api.Domain.Entities;
using NoNeed2Ask.Api.Shared;

namespace NoNeed2Ask.Api.Features.Application;

public static class DeleteApplication
{
    private const string NameRequest = "DeleteApplication"; 

    public sealed class Endpoint : IEndpoint
    {
        public void MapEndpoint(IEndpointRouteBuilder app)
        {
            app.MapDelete("/", Handler.Handle)
                .WithName(NameRequest)
                .RequireAuthorization();
        }
    }

    private static class Handler
    {
        public static async Task<Results<NoContent, UnauthorizedHttpResult, NotFound>> Handle(
            Guid id,
            ClaimsPrincipal user,
            UserManager<AppUser> userManager,
            AppDbContext db,
            CancellationToken cancellationToken)
        {
            var userIdString = userManager.GetUserId(user);
            
            if (!Guid.TryParse(userIdString, out var userId))
            {
                return TypedResults.Unauthorized();
            }

            var application = await db.Applications
                .Where(a => a.Id == id && a.UserId == userId)
                .FirstOrDefaultAsync(cancellationToken);

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