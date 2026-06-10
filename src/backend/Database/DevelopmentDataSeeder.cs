using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using NoNeed2Ask.Api.Domain.Entities;

namespace NoNeed2Ask.Api.Database;

public static class DevelopmentDataSeeder
{
    private static readonly Guid DevUserId = Guid.Parse("5cc22f61-e8d2-4988-a93d-f65d7a696985");
    private const string DevUsername = "Daan";
    private const string DevEmail = "test@test.com";
    private const string DevPassword = "Test123@";
    private const string SeedMarker = "Development seed application";

    public static async Task SeedAsync(
        AppDbContext dbContext,
        UserManager<AppUser> userManager,
        CancellationToken cancellationToken = default)
    {
        var user = await userManager.FindByIdAsync(DevUserId.ToString())
            ?? await userManager.FindByEmailAsync(DevEmail);

        if (user is null)
        {
            user = new AppUser
            {
                Id = DevUserId,
                UserName = DevUsername,
                Email = DevEmail,
                EmailConfirmed = true
            };

            var result = await userManager.CreateAsync(user, DevPassword);
            if (!result.Succeeded)
            {
                throw new InvalidOperationException(
                    "Failed to seed development user: " +
                    string.Join(", ", result.Errors.Select(error => error.Description)));
            }
        }
        else
        {
            var changed = false;

            if (user.UserName != DevUsername)
            {
                user.UserName = DevUsername;
                changed = true;
            }

            if (user.Email != DevEmail)
            {
                user.Email = DevEmail;
                user.EmailConfirmed = true;
                changed = true;
            }

            if (changed)
            {
                var result = await userManager.UpdateAsync(user);
                if (!result.Succeeded)
                {
                    throw new InvalidOperationException(
                        "Failed to update development user: " +
                        string.Join(", ", result.Errors.Select(error => error.Description)));
                }
            }
        }

        var existingSeedIndexes = await dbContext.Applications
            .Where(application =>
                application.UserId == user.Id &&
                application.PrivateNote != null &&
                application.PrivateNote.StartsWith(SeedMarker))
            .Select(application => application.PrivateNote!)
            .ToListAsync(cancellationToken);

        var indexes = existingSeedIndexes
            .Select(GetSeedIndex)
            .Where(index => index is not null)
            .Select(index => index!.Value)
            .ToHashSet();

        var now = DateTimeOffset.UtcNow;
        var applications = BuildApplications(user.Id, now)
            .Where((_, index) => !indexes.Contains(index + 1))
            .ToList();

        if (applications.Count == 0)
        {
            return;
        }

        dbContext.Applications.AddRange(applications);
        await dbContext.SaveChangesAsync(cancellationToken);
    }

    private static IEnumerable<Application> BuildApplications(Guid userId, DateTimeOffset now)
    {
        var statuses = new[]
        {
            ApplicationStatuses.Applied,
            ApplicationStatuses.InterviewPlanned,
            ApplicationStatuses.InterviewDone,
            ApplicationStatuses.Offer,
            ApplicationStatuses.Rejected,
            ApplicationStatuses.Paused
        };

        var companies = new[]
        {
            "Northstar Labs",
            "Atlas Works",
            "Orbit Systems",
            "Pinecone Digital",
            "Summit Software",
            "Riverbank Health",
            "BrightPath AI",
            "Harbor Cloud",
            "Cobalt Finance",
            "Meadow Mobility",
            "Signal Forge",
            "Evergreen Energy",
            "Waypoint Travel",
            "Quartz Analytics",
            "Nimbus Security",
            "Lumen Retail",
            "Fieldstone Robotics",
            "Aster Learning",
            "Bluebird Logistics",
            "Copperline Studio",
            "Starlit Commerce",
            "Horizon Bio",
            "Verve Payments",
            "Cedar CRM",
            "Kernel Ops",
            "Maple Media",
            "Fjord Games",
            "Keystone Data",
            "Arcadia Tools",
            "Prairie Platform"
        };

        var jobTitles = new[]
        {
            "Frontend Engineer",
            "Full Stack Developer",
            "Backend Engineer",
            "Product Engineer",
            "Software Engineer",
            "Platform Engineer"
        };

        for (var index = 0; index < companies.Length; index++)
        {
            var seedNumber = index + 1;
            var status = statuses[index % statuses.Length];
            var createdAt = now.AddDays(-seedNumber * 2);

            yield return new Application
            {
                UserId = userId,
                CompanyName = companies[index],
                JobTitle = jobTitles[index % jobTitles.Length],
                Status = status,
                PublicNote = GetPublicNote(status),
                PrivateNote = $"{SeedMarker} {seedNumber:00}",
                LastContactAt = createdAt.AddDays(1),
                NextActionAt = GetNextActionAt(status, now, seedNumber),
                CreatedAt = createdAt,
                UpdatedAt = createdAt.AddHours(4)
            };
        }
    }

    private static DateTimeOffset? GetNextActionAt(string status, DateTimeOffset now, int seedNumber)
    {
        return status switch
        {
            ApplicationStatuses.Applied => now.AddDays(seedNumber % 5 + 1),
            ApplicationStatuses.InterviewPlanned => now.AddDays(seedNumber % 4 + 1),
            ApplicationStatuses.Paused => now.AddDays(14 + seedNumber % 7),
            _ => null
        };
    }

    private static string GetPublicNote(string status)
    {
        return status switch
        {
            ApplicationStatuses.Applied => "Application submitted.",
            ApplicationStatuses.InterviewPlanned => "Interview scheduled.",
            ApplicationStatuses.InterviewDone => "Interview completed.",
            ApplicationStatuses.Offer => "Offer received.",
            ApplicationStatuses.Rejected => "Process ended.",
            ApplicationStatuses.Paused => "Application paused for now.",
            _ => "Application in progress."
        };
    }

    private static int? GetSeedIndex(string privateNote)
    {
        var suffix = privateNote[SeedMarker.Length..].Trim();
        return int.TryParse(suffix, out var index) ? index : null;
    }
}
