using System.Collections.Generic;
using System.Threading.Tasks;
using ICareAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace ICareAPI.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        public UserRepository(DataContext context)
        {
            _context = context;

        }

        public async Task<List<User>> GetAllUsers()
        {
            var users = await _context.Users.ToListAsync();

            return users;
        }


        public async Task<User> GetUserById(int id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(user => user.Id == id);

            return user;

        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;

        }
    }
}