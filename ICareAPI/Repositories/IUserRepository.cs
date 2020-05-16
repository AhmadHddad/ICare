using System.Collections.Generic;
using System.Threading.Tasks;
using ICareAPI.Models;

namespace ICareAPI.Repositories
{
    public interface IUserRepository
    {

        Task<User> GetUserById(int id);

        Task<List<User>> GetAllUsers();

        Task<bool> SaveAll();


    }
}