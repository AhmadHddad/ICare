using System;
using System.Collections.Generic;
using ICareAPI.Models;

namespace ICareAPI.Dtos
{
    public class RecordForAddEditDetails
    {
        public int Id { get; set; }

        public string DiseaseName { get; set; } = default!;

        public string Description { get; set; } = default!;

        public double Bill { get; set; }

        public DateTime TimeOfEntry { get; set; }

        public int PatientId { get; set; }

    }
}
