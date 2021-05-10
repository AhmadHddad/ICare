using System;
using System.ComponentModel.DataAnnotations;

namespace ICareAPI.Dtos
{
    public class DoctorForEditDto
    {
        public int Id { get; set; }

        [Required]
        [StringLength(20, MinimumLength = 3, ErrorMessage = "User Name Minimum Length Is 3 And Maximum Is 20!")]
        public string Name { get; set; } = "";

        [Required]
        public DateTime DateOfBirth { get; set; }

        public string? Email { get; set; }

        [Required]
        public string Specialty { get; set; } = "";

        [Required]
        [StringLength(9, MinimumLength = 9, ErrorMessage = "Phone Number must be 10 digits!")]
        public string PhoneNumber { get; set; } = "";


        [Required]
        public string University { get; set; } = "";

        [Required]
        public string Department { get; set; } = "";


    }
}