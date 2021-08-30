using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Threading.Tasks;
using ICareAPI.Models;

namespace ICareAPI.Repositories
{
    public interface IAdminRepository
    {
        Task<AppUser> GetAppUser(int userId, bool includeRoles = true);
        Task<AppUser> GetAppUser(string email, bool includeRoles = true);

        Task<IList<AppUser>> GetAppUsers(bool includeRoles = true);

        Task<AppUser> UpdateUserDetails(AppUser appUser);


        Task<bool> DeleteUser(int userId);

        Task<bool> SetUserRole(int roleId);



    }
}