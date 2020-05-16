using System;
using System.Collections.Generic;

namespace ICareAPI.Models
{
    public class Patient
    {

        public int Id { get; set; }
        public string Name { get; set; }

        public int OfficialId { get; set; }

        public DateTime DateOfBirth { get; set; }

        public string? Email { get; set; }

        public DateTime Created { get; set; } = DateTime.Now;

        public ICollection<Record> Records { get; set; }
    }
}
