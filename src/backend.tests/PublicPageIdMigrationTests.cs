using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using NoNeed2Ask.Api.Database;
using NoNeed2Ask.Api.Domain.Entities;
using Testcontainers.PostgreSql;

namespace NoNeed2Ask.Api.Tests;

public sealed class PublicPageIdMigrationTests
{
    [Fact]
    public async Task Migration_ReplacesExistingSlugsAndPreservesData_InBothDirections()
    {
        await using var postgres = new PostgreSqlBuilder("postgres:18-alpine").Build();
        await postgres.StartAsync();
        await using var db = new AppDbContext(new DbContextOptionsBuilder<AppDbContext>()
            .UseNpgsql(postgres.GetConnectionString()).Options);
        var migrator = db.GetService<IMigrator>();
        await migrator.MigrateAsync("20260522131945_InitialCreate");

        var owner = new AppUser { UserName = "First Owner" };
        var other = new AppUser { UserName = "Second Owner" };
        db.Users.AddRange(owner, other);
        var application = new Application
        {
            UserId = owner.Id, CompanyName = "Example", JobTitle = "Engineer",
            Status = "applied", PrivateNote = "Keep private"
        };
        db.Applications.Add(application);
        await db.SaveChangesAsync();
        await db.Database.ExecuteSqlInterpolatedAsync($"""
            INSERT INTO public_profile_settings ("UserId", "PublicSlug", "IsPublicSharingEnabled")
            VALUES ({owner.Id}, 'first-owner-job-search', true),
                   ({other.Id}, 'second-owner-job-search', false);
            """);
        var originalDates = await db.Database.SqlQuery<DateTimeOffset>($"""
            SELECT "CreatedAt" AS "Value" FROM public_profile_settings ORDER BY "UserId"
            """).ToListAsync();

        await migrator.MigrateAsync();
        var settings = await db.PublicProfileSettings.AsNoTracking().OrderBy(x => x.UserId).ToListAsync();
        settings.Should().HaveCount(2);
        settings.Select(x => x.PublicPageId).Should().OnlyHaveUniqueItems();
        foreach (var profile in settings)
        {
            profile.PublicPageId.Should().NotBeEmpty().And.NotBe(profile.UserId);
            profile.PublicPageId.ToString()[14].Should().Be('4');
            profile.IsPublicSharingEnabled.Should().Be(profile.UserId == owner.Id);
        }
        settings.Select(x => x.CreatedAt).Should().Equal(originalDates);
        (await db.Applications.AsNoTracking().SingleAsync()).PrivateNote.Should().Be("Keep private");

        await migrator.MigrateAsync("20260522131945_InitialCreate");
        var restoredLinks = await db.Database.SqlQuery<string>($"""
            SELECT "PublicSlug" AS "Value" FROM public_profile_settings ORDER BY "UserId"
            """).ToListAsync();
        restoredLinks.Should().Equal(settings.Select(x => x.PublicPageId.ToString()));
        (await db.Applications.CountAsync()).Should().Be(1);
    }
}
