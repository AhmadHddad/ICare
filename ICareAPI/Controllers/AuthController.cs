using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using ICareAPI.Repositories;
using ICareAPI.Dtos;
using ICareAPI.Helpers;
using ICareAPI.Models;
using Microsoft.AspNetCore.Authorization;

namespace ICareAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class AuthController : ControllerBase
    {

        private readonly IAuthRepository _repo;
        private readonly IConfiguration _config;

        public AuthController(IAuthRepository repo, IConfiguration config)
        {
            _repo = repo;
            _config = config;
        }



        [HttpPost("register")]

        public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
        {


            var newUser = new User
            {
                Email = userForRegisterDto.Email,
                UserName = userForRegisterDto.UserName
            };


            var reg = await _repo.Register(newUser, userForRegisterDto.Password);
            return StatusCode(201);
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto userForLoginDto)
        {
            var user = await _repo.Login(userForLoginDto.Email.ToLower(), userForLoginDto.Password);

            if (user == null)
            {
                return Unauthorized("Email Or Password Is Wrong");
            }
            else
            {

                var token = _repo.GenerateUserToken(user);

                return Ok(token);
            }
        }

    }
}