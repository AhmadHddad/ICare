using System;

namespace ICareAPI.Models
{
    public class User
    {
        public int Id { get; set; }

        public string UserName { get; set; }

        public string Email { get; set; }

        public byte[] PasswordHash { get; set; }

        public byte[] PasswordSalt { get; set; }


        public DateTime Created { get; set; } = DateTime.Now;

        public DateTime LastAcitve { get; set; } = DateTime.Now;




    }
}
