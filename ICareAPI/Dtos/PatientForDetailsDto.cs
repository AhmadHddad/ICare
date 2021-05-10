using System;
using System.Collections.Generic;
using ICareAPI.Models;

namespace ICareAPI.Dtos
{
    public class PatientForDetailsDto
    {
        public int Id { get; set; }


        public string Name { get; set; } = default!;

        public int OfficialId { get; set; }

        public DateTime DateOfBirth { get; set; }

        public string PhoneNumber { get; set; } = default!;


        public string? Email { get; set; }


        public IList<RecordForAddEditDetails>? Records { get; set; }

        public bool Archived { get; set; }
        public DateTime? ArchivedDate { get; set; }

    }
}
