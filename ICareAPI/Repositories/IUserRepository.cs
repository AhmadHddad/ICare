using System.Collections.Generic;
using System.Threading.Tasks;
using ICareAPI.Models;

namespace ICareAPI.Repositories
{
    public interface IUserRepository
    {

        Task<AppUser> GetUserByIdAsync(int id);

        Task<List<AppUser>> GetAllUsersAsync();

        Task<bool> SaveAllAsync();


    }
}