using System;
namespace ICareAPI.Models
{
    public class PatientDoctor
    {

        public int Id { get; set; }

        public int PatientId { get; set; }

        public int DoctorId { get; set; }

        public Doctor Doctor { get; set; }

        public Patient Patient { get; set; }

        public bool Archived { get; set; }
        public DateTime? ArchivedDate { get; set; }


    }
}