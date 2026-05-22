using FluentValidation;

namespace NoNeed2Ask.Api.Features;

public static class DependencyInjection
{
    public static IServiceCollection AddFeatureServices(this IServiceCollection services)
    {
        services.AddValidatorsFromAssembly(typeof(DependencyInjection).Assembly);

        return services;
    }
}
