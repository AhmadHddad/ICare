using System.Collections.Generic;
using System.Threading.Tasks;
using ICareAPI.Models;
using Microsoft.EntityFrameworkCore;
using ICareAPI.Data;

namespace ICareAPI.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        public UserRepository(DataContext context)
        {
            _context = context;

        }

        public async Task<List<AppUser>> GetAllUsersAsync()
        {
            var users = await _context.Users.ToListAsync();

            return users;
        }


        public async Task<AppUser> GetUserByIdAsync(int id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(user => user.Id == id);

            return user;

        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;

        }
    }
}