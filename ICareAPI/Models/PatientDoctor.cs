using System;
namespace ICareAPI.Models
{
    public class PatientDoctor
    {

        public int Id { get; set; }

        public int PatientId { get; set; }

        public int DoctorId { get; set; }

        public Doctor Doctor { get; set; } = default!;

        public Patient Patient { get; set; } = default!;

        public bool Archived { get; set; }
        public DateTime? ArchivedDate { get; set; }


    }
}