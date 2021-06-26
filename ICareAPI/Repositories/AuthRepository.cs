using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using ICareAPI.constants;
using ICareAPI.Middlewares;
using ICareAPI.Models;
using Microsoft.AspNetCore.Identity;
// using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using static ICareAPI.constants.Enums;

namespace ICareAPI.Repositories
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext _context;
        private readonly IConfiguration _config;
        private readonly SignInManager<User> _signInManager;
        //     // private readonly RoleManager<Role> _roleManager;
        private readonly UserManager<User> _userManager;

        public AuthRepository(DataContext context, IConfiguration config,
    UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            // _roleManager = roleManager;
            _context = context;
            _config = config;

        }





        // public AuthRepository(DataContext context, IConfiguration config)
        // {

        //     _context = context;
        //     _config = config;

        // }

        public async Task<bool> EmailExists(string email)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == email);

            if (user != null)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public async Task<User?> Login(string email, string password)
        {
            // var user = await _userManager.FindByEmailAsync(email);
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == email);


            if (user is not null)
            {

                var result = await _signInManager.CheckPasswordSignInAsync(user, password, false);


                if (result.Succeeded)
                {
                    return user;
                }
                else
                {
                    throw new UnAuthorizedException("User name or password is wrong");
                }

            }
            else
            {
                throw new UnAuthorizedException("Email Or Password Is Wrong");
            }


        }



        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));

                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != passwordHash[i])
                    {
                        return false;
                    }
                }

                return true;
            }
        }


        // private async void CreateRoles()
        // {
        //     var existingRoles = await _roleManager.Roles.CountAsync();

        //     if (existingRoles == 0)
        //     {
        //         var newRoles = new List<Role>
        //         {
        //             new Role{Name=Enums.Admin},
        //             new Role{Name= Enums.Doctor},
        //             new Role{Name= Enums.Patient},
        //         };


        //         foreach (var role in newRoles)
        //         {
        //             await _roleManager.CreateAsync(role);
        //         }
        //     }
        // }

        public async Task<User> Register(User user, string password)
        {

            if (!await EmailExists(user.Email))
            {
                // CreateRoles();

                user.Created = DateTime.Now;

                var result = await _userManager.CreateAsync(user, password);

                if (result.Succeeded)
                {
                    // var res = await _userManager.AddToRoleAsync(user, "Admin");

                    return user;
                }
                else
                {
                    throw new BadRequestException("Could not create user");

                }
            }
            else
            {
                throw new BadRequestException("User already exists");
            }


        }


        private Claim[] CreateUserClaims(User user)
        {
            return new[] {
                new Claim (ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim (ClaimTypes.Name, user.UserName.ToString()),
                    new Claim(ClaimTypes.Email, user.Email.ToString())
            };
        }

        private SigningCredentials GenerateSigningCredentials()
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            return creds;
        }

        private SecurityTokenDescriptor CreateSecurityTokenDescriptor(Claim[] claims, SigningCredentials credentials)
        {

            var tokenDecriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = credentials
            };

            return tokenDecriptor;
        }

        private dynamic CreateToken(SecurityTokenDescriptor tokenDescriptor)
        {

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return new { token = tokenHandler.WriteToken(token), Expires = DateTime.Now.AddDays(1) };
        }

        public dynamic GenerateUserToken(User user)
        {

            var userClaims = CreateUserClaims(user);
            var signingCredentials = GenerateSigningCredentials();
            var tokenDecriptor = CreateSecurityTokenDescriptor(userClaims, signingCredentials);

            var userToken = CreateToken(tokenDecriptor);

            return userToken;
        }


        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }

    }
}