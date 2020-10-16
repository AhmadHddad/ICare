using System.ComponentModel.DataAnnotations;

namespace ICareAPI.Dtos
{
    public class UserForRegisterDto
    {

        [Required]
        [EmailAddress]
        public string Email { get; set; } = default!;

        [Required]
        [StringLength(20, MinimumLength = 3, ErrorMessage = "User Name Minimum Length Is 3 And Maximum Is 20")]
        public string UserName { get; set; } = default!;


        [Required]
        [StringLength(16, MinimumLength = 6, ErrorMessage = "Password Minimum Length Is 3 And Maximum Is 16")]
        public string Password { get; set; } = default!;

    }
}
