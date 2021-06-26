using Microsoft.AspNetCore.Identity;

namespace ICareAPI.Models
{
    public class UserRole : IdentityUserRole<int>
    {
        public int Id { get; set; }

        public User User { get; set; } = default!;

        public Role Role { get; set; } = default!;
    }
}
