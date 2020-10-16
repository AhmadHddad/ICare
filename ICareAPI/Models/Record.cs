using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ICareAPI.Models
{
    public class Record
    {
        public int Id { get; set; }

        public string DiseaseName { get; set; } = default!;

        public string Description { get; set; } = default!;

        public double Bill { get; set; }

        public DateTime TimeOfEntry { get; set; } = DateTime.Now;

        public DateTime Created { get; set; } = DateTime.Now;

        public Patient Patient { get; set; } = default!;

        public int PatientId { get; set; }

        public bool Archived { get; set; }

        public DateTime? ArchivedDate { get; set; }


    }
}
