using System;
using System.Collections.Generic;
using ICareAPI.Dtos;

namespace ICareAPI.Dtos
{
    public class PatientWithAssignedDoctorsDto
    {

        public int Id { get; set; }


        public string Name { get; set; } = "";

        public int OfficialId { get; set; }

        public DateTime DateOfBirth { get; set; } = DateTime.Now;

        public string? Email { get; set; } = "";


        public string LastEntry { get; set; } = "";

        public IList<int> AssignedDoctorsIds { get; set; } = new List<int>();

        public bool Archived { get; set; }
        
        public DateTime? ArchivedDate { get; set; }

    }
}