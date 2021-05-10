using System;

namespace ICareAPI.Dtos
{
    public class PatientsForListDto
    {
        public int Id { get; set; }

        public string Name { get; set; } = default!;

        public string PhoneNumber { get; set; } = default!;

        public DateTime DateOfBirth { get; set; }

        public string LastEntry { get; set; } = default!;


        public bool Archived { get; set; }
        public DateTime? ArchivedDate { get; set; }

    }
}
