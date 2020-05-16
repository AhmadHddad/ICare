using System.ComponentModel.DataAnnotations;


namespace ICareAPI.Dtos
{
    public class UserForLoginDto
    {


        [Required]
        [EmailAddress]
        public string Email { get; set; }


        [Required]
        [StringLength(16, MinimumLength = 6, ErrorMessage = "Password Minimum Length Is 3 And Maximum Is 16")]
        public string Password { get; set; }
    }
}
