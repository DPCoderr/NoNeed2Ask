using NoNeed2Ask.Api.Features;
using NoNeed2Ask.Api.Features.Application.GetAllApplications;

namespace NoNeed2Ask.Api.Features.Application;

public static class ApplicationEndpoints
{
    public const string GetByIdRouteName = "Applications_GetById";

    public static IEndpointRouteBuilder MapApplicationEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/applications")
            .WithTags("Applications");

        new GetApplication.Endpoint().MapEndpoint(app);
        new GetAllApplicationsEndpoint.Endpoint().MapEndpoint(app);
        new CreateApplication.Endpoint().MapEndpoint(app);
        new UpdateApplication.Endpoint().MapEndpoint(app);
        new DeleteApplication.Endpoint().MapEndpoint(app);
        

        // group.MapGet("/", ApplicationList.Handle)
        //     .AddEndpointFilter<ValidationFilter<ApplicationListRequestDto>>()
        //     .RequireAuthorization();
        //
        // group.MapGet("/{id}", ApplicationGetById.Handle)
        //     .WithName(GetByIdRouteName)
        //     .RequireAuthorization();
        //
        // group.MapPost("/", ApplicationCreate.Handle)
        //     .AddEndpointFilter<ValidationFilter<CreateApplicationRequestDto>>()
        //     .RequireAuthorization();
        //
        // group.MapPut("/{id}", ApplicationUpdate.Handle)
        //     .AddEndpointFilter<ValidationFilter<UpdateApplicationRequestDto>>()
        //     .RequireAuthorization();
        //
        // group.MapDelete("/{id}", ApplicationDelete.Handle)
        //     .RequireAuthorization();

        return app;
    }
}
