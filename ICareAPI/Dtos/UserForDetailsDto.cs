using System;
using System.Collections.Generic;
using System.Linq;

namespace ICareAPI.Dtos
{

    public class UserForDetailsDto
    {
        public int Id { get; set; }

        public string UserName { get; set; } = default!;

        public string Email { get; set; } = default!;

        public DateTime Created { get; set; }

        public DateTime LastActivity { get; set; }

        public bool Archived { get; set; }

        public DateTime? ArchivedDate { get; set; }

    }


}