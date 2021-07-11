using Microsoft.AspNetCore.Identity;

namespace ICareAPI.Models
{
    public class UserRole : IdentityUserRole<int>
    {
        public AppUser User { get; set; } = default!;

        public AppRole Role { get; set; } = default!;
    }
}
