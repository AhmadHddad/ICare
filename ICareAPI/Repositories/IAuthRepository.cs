using System.Threading.Tasks;
using ICareAPI.Models;

namespace ICareAPI.Repositories
{
    public interface IAuthRepository
    {
        Task<User> Register(User user, string password);
        Task<User> Login(string email, string password);

        Task<bool> EmailExists(string email);

        Task<bool> SaveAll();
    }
}
