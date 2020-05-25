namespace ICareAPI.Models
{
    public class PatientDoctor
    {
        public int PatientId { get; set; }

        public int DoctorId { get; set; }

        public Doctor Doctor { get; set; }

        public Patient Patient { get; set; }

    }
}