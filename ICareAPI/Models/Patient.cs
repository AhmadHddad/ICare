using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace ICareAPI.Models
{
    public class Patient
    {

        public int Id { get; set; }
        public string Name { get; set; } = default!;

        public string OfficialId { get; set; } = default!;

        public DateTime DateOfBirth { get; set; }

        public string? Email { get; set; }

        public string PhoneNumber { get; set; } = default!;

        public DateTime Created { get; set; } = DateTime.Now;

        public ICollection<Record> Records { get; set; } = new Collection<Record>();


        public ICollection<PatientDoctor> PatientDoctors { get; set; } = new Collection<PatientDoctor>();

        public bool Archived { get; set; }

        public DateTime? ArchivedDate { get; set; }


    }
}
