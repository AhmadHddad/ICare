using System;

namespace ICareAPI.Dtos
{
    public class PatientsForListDto
    {
        public int Id { get; set; }

        public string Name { get; set; }


        public DateTime DateOfBirth { get; set; }

        public string LastEntry { get; set; }


        public bool Archived { get; set; }
        public DateTime? ArchivedDate { get; set; }

    }
}
