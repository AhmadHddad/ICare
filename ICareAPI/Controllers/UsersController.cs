using System.Collections.Generic;
using System.Threading.Tasks;
using ICareAPI.Models;
using ICareAPI.Repositories;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using ICareAPI.Dtos;

namespace ICareAPI.Controllers
{
    [Authorize]
    [Route("api/users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _repo;
        private readonly IMapper _mapper;
        public UsersController(IUserRepository repository, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repository;

        }


        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = _mapper.Map<IList<UserForDetailsDto>>(await _repo.GetAllUsers());
            return Ok(users);
        }
    }
}