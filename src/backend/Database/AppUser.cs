using Microsoft.AspNetCore.Identity;

namespace NoNeed2Ask.Api.Database;

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
