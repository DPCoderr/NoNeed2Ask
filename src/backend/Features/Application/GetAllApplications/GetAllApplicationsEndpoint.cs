using NoNeed2Ask.Api.Shared;

namespace NoNeed2Ask.Api.Features.Application.GetAllApplications;

public class GetAllApplicationsEndpoint
{
    public class Endpoint : IEndpoint
    {
        public void MapEndpoint(IEndpointRouteBuilder app)
        {
            app.MapGet("/applications", GetAllApplicationsHandler.Handle)
                .WithName("GetAllApplications")
                .RequireAuthorization();;
        }
    }
} 