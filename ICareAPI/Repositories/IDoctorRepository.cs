using System.Collections.Generic;
using System.Threading.Tasks;
using ICareAPI.Helpers;
using ICareAPI.Helpers.Pagination;
using ICareAPI.Models;

namespace ICareAPI.Repositories
{
    public interface IDoctorRepository
    {
        Task<Doctor> GetDoctor(int id);

        Task<PagedList<Doctor>> GetDoctors(PaginationParams paginationParams);

        Task<Doctor> AddDoctor(Doctor doctor);

        Task<Doctor> DeleteDocotr(int id);


    }
}