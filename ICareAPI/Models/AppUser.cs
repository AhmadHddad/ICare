using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;

namespace ICareAPI.Models
{
    public class AppUser : IdentityUser<int>
    {
        public DateTime Created { get; set; } = DateTime.Now;

        public DateTime DateOfBirth { get; set; }

        public DateTime LastActivity { get; set; } = DateTime.Now;

        public bool Archived { get; set; }

        public DateTime? ArchivedDate { get; set; }

        public ICollection<UserRole> UserRoles { get; set; } = default!;

        public bool Blocked { get; set; } = false;

        public DateTime? BlockedAt { get; set; }

    }
}
