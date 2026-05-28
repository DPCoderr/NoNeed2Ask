using Microsoft.AspNetCore.Identity;
using NoNeed2Ask.Api.Database;

namespace NoNeed2Ask.Api.Domain.Entities;

public sealed class AppUser : IdentityUser<Guid>
{
    public AppUser()
    {
        Id = Guid.NewGuid();
        SecurityStamp = Guid.NewGuid().ToString();
    }

    public ICollection<Application> Applications { get; } = [];

    public PublicProfileSettings? PublicProfileSettings { get; set; }
}
