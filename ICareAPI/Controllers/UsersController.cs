using System.Collections.Generic;
using System.Threading.Tasks;
using ICareAPI.Models;
using ICareAPI.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace ICareAPI.Controllers
{
    [Authorize]
    [Route("api/users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _repo;
        public UsersController(IUserRepository repository)
        {
            _repo = repository;

        }


        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _repo.GetAllUsers();

            return Ok(users);
        }
    }
}