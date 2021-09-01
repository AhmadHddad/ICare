using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ICareAPI.Middlewares;
using ICareAPI.Models;
using ICareAPI.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace ICareAPI.Repositories
{
    public class AdminRepository : IAdminRepository
    {
        private readonly DataContext _context;
        private readonly RoleManager<AppRole> _roleManager;
        private readonly UserManager<AppUser> _userManager;

        public AdminRepository(DataContext context, UserManager<AppUser> userManager,
         RoleManager<AppRole> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _context = context;


        }

        public Task<bool> DeleteUser(int userId)
        {
            throw new System.NotImplementedException();
        }

        public async Task<AppUser> GetAppUser(int userId, bool includeRoles = true)
        {


            var user = await GetUserModelIncludeRoles(includeRoles).FirstOrDefaultAsync(user => user.Id == userId);

            if (user is null)
            {
                throw new BadRequestException("No user with this userId");
            }

            return user;

        }

        public async Task<AppUser> GetAppUser(string email, bool includeRoles = true)
        {
            var user = await GetUserModelIncludeRoles(includeRoles).FirstOrDefaultAsync(user => user.Email == email);

            if (user is null)
            {
                throw new BadRequestException("No user with this Email");
            }

            return user;

        }

        public async Task<IList<AppUser>> GetAppUsers(bool includeRoles = true) =>
         await GetUserModelIncludeRoles(includeRoles).ToListAsync();

        public Task<bool> SetUserRole(int roleId)
        {
            throw new System.NotImplementedException();
        }

        public Task<AppUser> UpdateUserDetails(AppUser appUser)
        {
            throw new System.NotImplementedException();
        }


        private IQueryable<AppUser>? GetUserModelIncludeRoles(bool includeRoles)
        {

            var userModel = _userManager.Users;

            if (includeRoles)
            {
                userModel = userModel.Include(u => u.UserRoles);
            }

            return userModel;
        }
    }
}