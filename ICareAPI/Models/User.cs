using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;

namespace ICareAPI.Models
{
    public class User
    {
        public int Id { get; set; }

        public string UserName { get; set; } = default!;

        public string Email { get; set; } = default!;

        public byte[] PasswordHash { get; set; } = default!;

        public byte[] PasswordSalt { get; set; } = default!;

        public DateTime Created { get; set; } = DateTime.Now;

        public DateTime LastActivity { get; set; } = DateTime.Now;

        public bool Archived { get; set; }

        public DateTime? ArchivedDate { get; set; }

        // public ICollection<UserRole> UserRoles { get; set; } = default!;


    }
}
