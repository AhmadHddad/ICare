using System.Collections.Generic;
using System.Threading.Tasks;
using ICareAPI.Dtos;
using ICareAPI.Helpers;
using ICareAPI.Models;

namespace ICareAPI.Repositories
{
    public interface IPatientDoctorRepository
    {
        Task<List<PatientDoctor>> GetAssignedDoctorsToPatientId(int patientId, bool? withPatientRecords);

        Task<PagedList<PatientWithAssignedDoctorsDto>> GetAssignedPatientsToDoctorId(int dcotorId, Helpers.Pagination.PaginationParams pagenationParams);

        Task<List<PatientDoctor>> GetAssignedPatientsDoctors(bool? withPatientRecords);


        Task<PatientDoctor> GetPatientDoctor(int dcotorId, int patientId, bool? withPatientRecords);


        Task<PatientDoctor> AddPatientDoctor(int dcotorId, int patientId);

        Task<PatientDoctor> RemovePatientDoctor(int dcotorId, int patientId);


    }
}