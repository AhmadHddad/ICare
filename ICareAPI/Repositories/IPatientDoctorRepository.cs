using System.Collections.Generic;
using System.Threading.Tasks;
using ICareAPI.Dtos;
using ICareAPI.Models;

namespace ICareAPI.Repositories
{
    public interface IPatientDoctorRepository
    {
        Task<List<PatientDoctor>> GetAssignedDoctorsToPatientId(int patientId, bool? withPatientRecords);

        Task<List<PatientWithAssignedDoctorsDto>> GetAssignedPatientsToDoctorId(int dcotorId);

        Task<List<PatientDoctor>> GetAssignedPatientsDoctors(bool? withPatientRecords);


        Task<PatientDoctor> GetPatientDoctor(int dcotorId, int patientId, bool? withPatientRecords);


        Task<PatientDoctor> AddPatientDoctor(int dcotorId, int patientId);

        Task<PatientDoctor> RemovePatientDoctor(int dcotorId, int patientId);


    }
}