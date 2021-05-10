using System.IO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ICareAPI.Dtos;
using ICareAPI.Models;
using Microsoft.AspNetCore.JsonPatch;
using ICareAPI.Helpers;
using ICareAPI.Helpers.Pagination;

namespace ICareAPI.Repositories
{
    public interface IPatientRepository
    {
        Patient AddPatient(Patient patient);

        Task<Patient> DeletePatientAsync(Patient patient);

        Task<PagedList<Patient>> GetPatientsAsync(bool? withRecords, PaginationParams paginationParams);

        Task<Patient> GetPatientAsync(int id, bool? withRecords = false);

        Task<Patient> EditPatientAsync(Patient patient);

        List<Patient> PatientsWithSimilarDisease(int patientId);

        Task<int> PatchPatientAsync(int id, JsonPatchDocument<Patient> patient);


        Task<PagedList<PatientsForListDto>> GetUnAssignedPatientsToDoctorAsync(int doctorId, PaginationParams paginationParams);




    }
}
