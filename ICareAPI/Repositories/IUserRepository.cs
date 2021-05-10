using System.Collections.Generic;
using System.Threading.Tasks;
using ICareAPI.Models;

namespace ICareAPI.Repositories
{
    public interface IUserRepository
    {

        Task<User> GetUserByIdAsync(int id);

        Task<List<User>> GetAllUsersAsync();

        Task<bool> SaveAllAsync();


    }
}