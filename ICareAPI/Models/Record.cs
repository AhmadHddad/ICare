using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ICareAPI.Models
{
    public class Record
    {
        public int Id { get; set; }

        public string DiseaseName { get; set; }

        public string Description { get; set; }

        public double Bill { get; set; }

        public DateTime TimeOfEntry { get; set; } = DateTime.Now;

        public DateTime Created { get; set; } = DateTime.Now;

        public Patient Patient { get; set; }

        public int PatientId { get; set; }

        public bool Archived { get; set; }

        public DateTime? ArchivedDate { get; set; }


    }
}
