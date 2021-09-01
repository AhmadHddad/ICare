using System.Net;
using System.Threading.Tasks;
using ICareAPI.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace ICareAPI.Controllers
{
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