using System.Collections.Generic;
using System.Threading.Tasks;
using ICareAPI.Dtos;
using ICareAPI.Helpers;
using ICareAPI.Helpers.Pagination;
using ICareAPI.Models;

namespace ICareAPI.Repositories
{
    public interface IDoctorRepository
    {
        Task<Doctor> GetDoctorAsync(int id);

        Task<PagedList<Doctor>> GetDoctorsAsync(PaginationParams paginationParams);

        Task<PagedList<DoctorForListDto>> GetDoctorsListAsync(PaginationParams paginationParams);

        Task<Doctor> AddDoctorAsync(Doctor doctor);

        Task<Doctor> EditDoctorAsync(Doctor doctor);

        Task<Doctor> DeleteDoctorAsync(int id);


    }
}