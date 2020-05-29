using System.ComponentModel.DataAnnotations;
namespace ICareAPI.Dtos
{
    public class DoctorForAddDto
    {

        [Required]
        public string Name { get; set; }

        [Required]
        [StringLength(9, MinimumLength = 9, ErrorMessage = "OfficialId must be 9 digits")]
        public string OfficialId { get; set; }

        [Required]
        public string Specialty { get; set; }


        [Required]
        public string University { get; set; }

        [Required]
        public string Department { get; set; }



    }
}