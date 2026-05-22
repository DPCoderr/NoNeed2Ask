using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace NoNeed2Ask.Api.Database;

public sealed class AppDbContext(DbContextOptions<AppDbContext> options)
    : IdentityDbContext<AppUser, IdentityRole<Guid>, Guid>(options)
{
    private const string ApplicationStatusConstraintName = "CK_applications_status";

    public DbSet<Application> Applications => Set<Application>();

    public DbSet<PublicProfileSettings> PublicProfileSettings => Set<PublicProfileSettings>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<AppUser>(user =>
        {
            user.ToTable("users");
        });

        builder.Entity<IdentityRole<Guid>>(role =>
        {
            role.ToTable("roles");
        });

        builder.Entity<IdentityUserRole<Guid>>(userRole =>
        {
            userRole.ToTable("user_roles");
        });

        builder.Entity<IdentityUserClaim<Guid>>(userClaim =>
        {
            userClaim.ToTable("user_claims");
        });

        builder.Entity<IdentityUserLogin<Guid>>(userLogin =>
        {
            userLogin.ToTable("user_logins");
        });

        builder.Entity<IdentityRoleClaim<Guid>>(roleClaim =>
        {
            roleClaim.ToTable("role_claims");
        });

        builder.Entity<IdentityUserToken<Guid>>(userToken =>
        {
            userToken.ToTable("user_tokens");
        });

        builder.Entity<Application>(application =>
        {
            // Enforce the same allowed status values in PostgreSQL that the app uses in code.
            application.ToTable(
                "applications",
                table => table.HasCheckConstraint(
                    ApplicationStatusConstraintName,
                    BuildApplicationStatusConstraint()));

            application.HasKey(x => x.Id);

            application.Property(x => x.CompanyName)
                .HasMaxLength(200);

            application.Property(x => x.JobTitle)
                .HasMaxLength(200);

            application.Property(x => x.Status)
                .HasMaxLength(64);

            application.Property(x => x.PublicNote)
                .HasMaxLength(2000);

            application.Property(x => x.PrivateNote)
                .HasMaxLength(4000);

            application.Property(x => x.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP");

            application.Property(x => x.UpdatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP");

            application.HasIndex(x => new { x.UserId, x.CreatedAt });

            application.HasOne(x => x.User)
                .WithMany(x => x.Applications)
                .HasForeignKey(x => x.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        builder.Entity<PublicProfileSettings>(settings =>
        {
            settings.ToTable("public_profile_settings");

            settings.HasKey(x => x.UserId);

            settings.Property(x => x.PublicSlug)
                .HasMaxLength(100);

            settings.Property(x => x.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP");

            settings.Property(x => x.UpdatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP");

            settings.HasIndex(x => x.PublicSlug)
                .IsUnique();

            settings.HasOne(x => x.User)
                .WithOne(x => x.PublicProfileSettings)
                .HasForeignKey<PublicProfileSettings>(x => x.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        });
    }

    private static string BuildApplicationStatusConstraint()
    {
        var allowedStatuses = string.Join(
            ", ",
            ApplicationStatuses.All.Select(status => $"'{status}'"));

        return $"\"Status\" IN ({allowedStatuses})";
    }
}
