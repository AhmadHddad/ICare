using System;
using System.Collections.Generic;
using System.Linq;

namespace ICareAPI.Dtos
{

    public class UserForDetailsDto
    {
        public int Id { get; set; }

        public string UserName { get; set; }

        public string Email { get; set; }

        public DateTime Created { get; set; }

        public DateTime LastAcitve { get; set; }

    }


}