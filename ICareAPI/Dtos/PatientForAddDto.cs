using System;
using System.ComponentModel.DataAnnotations;

namespace ICareAPI.Dtos
{
    public class PatientForAddDto
    {
        [Required]
        [StringLength(20, MinimumLength = 3, ErrorMessage = "User Name Minimum Length Is 3 And Maximum Is 20!")]
        public string Name { get; set; } = "";

        [Required]
        [StringLength(9, MinimumLength = 9, ErrorMessage = "OfficialId must be 9 digits!")]
        public string OfficialId { get; set; } = "";


        [Required]
        public DateTime DateOfBirth { get; set; } = DateTime.Now;

        public string? Email { get; set; } = "";

    }
}