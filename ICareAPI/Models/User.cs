using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;

namespace ICareAPI.Models
{
    public class User : IdentityUser<int>
    {
        public int Id { get; set; }

        public string UserName { get; set; }

        public string Email { get; set; }

        public byte[] PasswordHash { get; set; }

        public byte[] PasswordSalt { get; set; }


        public DateTime Created { get; set; } = DateTime.Now;

        public DateTime LastAcitve { get; set; } = DateTime.Now;

        public bool Archived { get; set; }

        public DateTime? ArchivedDate { get; set; }

        public ICollection<UserRole> UserRoles { get; set; }


    }
}
