using NoNeed2Ask.Api.Shared;

namespace NoNeed2Ask.Api.Features.Application.GetAllApplications;

public static class GetAllApplicationsEndpoint
{
    public sealed class Endpoint : IEndpoint
    {
        public void MapEndpoint(IEndpointRouteBuilder app)
        {
            app.MapGet("/", GetAllApplicationsHandler.Handle)
                .WithName("GetAllApplications")
                .RequireAuthorization();;
        }
    }
} 