using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;

namespace ICareAPI.Models
{
    public class User : IdentityUser<int>
    {
        public override string UserName { get; set; } = default!;

        public override string Email { get; set; } = default!;

        public DateTime Created { get; set; } = DateTime.Now;

        public DateTime LastActivity { get; set; } = DateTime.Now;

        public bool Archived { get; set; }

        public DateTime? ArchivedDate { get; set; }

        public ICollection<UserRole> UserRoles { get; set; } = default!;


    }
}
