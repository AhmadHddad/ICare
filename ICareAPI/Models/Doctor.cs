using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace ICareAPI.Models
{
    public class Doctor
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string OfficialId { get; set; }

        public string Specialty { get; set; }

        public string University { get; set; }

        public string Department { get; set; }


        public ICollection<PatientDoctor> PatientDoctors { get; set; } = new Collection<PatientDoctor>();
    }
}
