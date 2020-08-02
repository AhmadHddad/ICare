using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using ICareAPI.Models;

namespace ICareAPI.Dtos
{
    public class DoctorForDetailsDto
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string OfficialId { get; set; }

        public DateTime DateOfBirth { get; set; }

        public string? Email { get; set; }

        public string Specialty { get; set; }

        public string University { get; set; }

        public string Department { get; set; }

        public DateTime Created { get; set; } = DateTime.Now;

        public ICollection<PatientDoctor> PatientDoctors { get; set; } = new Collection<PatientDoctor>();

        public int NumberOfAssignedPatients { get; set; } = 0;

        public bool Archived { get; set; }
        public DateTime? ArchivedDate { get; set; }

    }
}