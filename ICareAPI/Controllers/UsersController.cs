using System.Collections.Generic;
using System.Threading.Tasks;
using ICareAPI.Models;
using ICareAPI.Repositories;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using ICareAPI.Dtos;
using Microsoft.AspNetCore.Authorization;

namespace ICareAPI.Controllers
{

    public class UsersController : BaseController
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
            var users = _mapper.Map<IList<UserForDetailsDto>>(await _repo.GetAllUsersAsync());
            return Ok(users);
        }
    }
}