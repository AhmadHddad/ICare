using System;
using System.ComponentModel.DataAnnotations;

namespace ICareAPI.Dtos
{
    public class PatientForAddEditDto
    {
        public int Id { get; set; }


        [Required]
        [StringLength(20, MinimumLength = 3, ErrorMessage = "User Name Minimum Length Is 3 And Maximum Is 20")]
        public string Name { get; set; }

        [Required]
        [Range(2, 9)]
        public int OfficialId { get; set; }


        [Required]
        public DateTime DateOfBirth { get; set; }

        public string? Email { get; set; }


    }
}
