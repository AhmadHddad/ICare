using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace ICareAPI.Models
{
    public class Doctor
    {
        public int Id { get; set; }

        public string Name { get; set; } = default!;

        public string OfficialId { get; set; } = default!;

        public DateTime DateOfBirth { get; set; }

        public string? Email { get; set; }

        public string Specialty { get; set; } = default!;

        public string University { get; set; } = default!;

        public string Department { get; set; } = default!;

        public DateTime Created { get; set; } = DateTime.Now;

        public ICollection<PatientDoctor> PatientDoctors { get; set; } = default!;


        public bool Archived { get; set; }

        public DateTime? ArchivedDate { get; set; }

    }
}
