namespace NoNeed2Ask.Api.Shared;

public interface IEndpoint
{
    // Called at startup. Inject request-scoped services into the handler.
    void MapEndpoint(IEndpointRouteBuilder app);
}
