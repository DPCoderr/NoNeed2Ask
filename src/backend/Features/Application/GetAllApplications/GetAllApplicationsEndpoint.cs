using NoNeed2Ask.Api.Shared;

namespace NoNeed2Ask.Api.Features.Application.GetAllApplications;

public static class GetAllApplicationsEndpoint
{
    public sealed class Endpoint : IEndpoint
    {
        public void MapEndpoint(IEndpointRouteBuilder app)
        {
            app.MapGet("/applications/", GetAllApplicationsHandler.Handle)
                .WithTags("Applications")
                .WithName("GetAllApplications")
                .RequireAuthorization();;
        }
    }
}
