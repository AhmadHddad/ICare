using System;

namespace ICareAPI.Dtos
{
    public class DoctorForListDto
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public DateTime DateOfBirth { get; set; }

        public string Specialty { get; set; }

        public string Department { get; set; }

        public int NumberOfAssignedPatients { get; set; } = 0;
    }
}