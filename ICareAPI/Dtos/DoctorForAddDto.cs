using System.ComponentModel.DataAnnotations;
using System;
namespace ICareAPI.Dtos
{
    public class DoctorForAddDto
    {

        [Required]
        [StringLength(20, MinimumLength = 3, ErrorMessage = "User Name Minimum Length Is 3 And Maximum Is 20!")]

        public string Name { get; set; } = "";

        [Required]
        [StringLength(9, MinimumLength = 9, ErrorMessage = "OfficialId must be 9 digits!")]
        public string OfficialId { get; set; } = "";

        [Required]
        public string Specialty { get; set; } = "";

        [Required]
        public DateTime DateOfBirth { get; set; } = DateTime.Now;

        public string? Email { get; set; }

        [Required]
        public string University { get; set; } = "";

        [Required]
        public string Department { get; set; } = "";


    }
}