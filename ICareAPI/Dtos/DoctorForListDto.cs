using System;

namespace ICareAPI.Dtos
{
    public class DoctorForListDto
    {
        public int Id { get; set; }

        public string Name { get; set; } = default!;

        public DateTime DateOfBirth { get; set; }

        public string Specialty { get; set; } = default!;

        public string Department { get; set; } = default!;

        public int NumberOfAssignedPatients { get; set; } = default!;


        public bool Archived { get; set; }
        public DateTime? ArchivedDate { get; set; }

    }
}