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

        Task<Patient> DeletePatient(Patient patient);

        Task<PagedList<Patient>> GetPatients(bool? withRecords, PaginationParams paginationParams);

        Task<Patient> GetPatient(int id, bool? withRecords);

        Task<Patient> EditPatient(Patient patient);

        Task<bool> PatientExistsByOfficialId(int officialId);

        Task<List<Patient>> PatientsWithSimilarDisease(int patientId);

        Task<int> PatchPatient(int id, JsonPatchDocument<Patient> patient);



    }
}
