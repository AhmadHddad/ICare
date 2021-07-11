using System.Threading.Tasks;
using ICareAPI.Models;
using Microsoft.AspNetCore.Identity;

namespace ICareAPI.Repositories
{
    public interface IAuthRepository
    {
        Task<AppUser> Register(AppUser user, string password);
        Task<AppUser?> Login(string email, string password);

        Task<bool> EmailExists(string email);

        Task<bool> SaveAll();

        dynamic GenerateUserToken(AppUser user);
    }
}
