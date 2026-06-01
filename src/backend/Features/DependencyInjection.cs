using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using FluentValidation;
using NoNeed2Ask.Api.Database;
using NoNeed2Ask.Api.Domain.Entities;

namespace NoNeed2Ask.Api.Features;

public static class DependencyInjection
{
    public static IServiceCollection AddDatabaseServices(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("noneed2askdb")
            ?? throw new InvalidOperationException(
                "Connection string 'noneed2askdb' was not found. " +
                "When running through Aspire AppHost, this is provided automatically via the Postgres resource reference. " +
                "When running the backend project directly, configure it with user secrets or an environment variable.");

        services.AddDbContext<AppDbContext>(options => options.UseNpgsql(connectionString));

        // Cookie auth
        services.AddAuthentication(IdentityConstants.ApplicationScheme)
            .AddIdentityCookies();

        services.AddIdentityCore<AppUser>(options =>
            {
                options.User.RequireUniqueEmail = true;
            })
            .AddRoles<IdentityRole<Guid>>()
            .AddEntityFrameworkStores<AppDbContext>()
            .AddSignInManager()
            .AddDefaultTokenProviders();

        return services;
    }

    public static IServiceCollection AddFeatureServices(this IServiceCollection services)
    {
        services.AddValidatorsFromAssembly(typeof(DependencyInjection).Assembly);

        return services;
    }
}
