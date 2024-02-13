using System.Net;
using System.Threading.Tasks;
using ICareAPI.constants;
using ICareAPI.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ICareAPI.Constants;
namespace ICareAPI.Controllers
{

    [Authorize(Policy = "REQUIRE_ADMIN_ROLE")]
    public class AdminController : BaseController
    {
        private readonly IAdminRepository _adminRepository;

        public AdminController(IAdminRepository adminRepository)
        {
            _adminRepository = adminRepository;

        }

        [HttpGet("GetUsers")]
        public async Task<IActionResult> GetAllUsers(bool includeRoles)
        {

            var users = await _adminRepository.GetAppUsers(includeRoles);


            return Ok(users);
        }


        [HttpGet("GetUserById")]
        public async Task<IActionResult> GetUserById(int userId, bool includeRoles)
        {

            var user = await _adminRepository.GetAppUser(userId, includeRoles);


            return Ok(user);
        }

    }
}