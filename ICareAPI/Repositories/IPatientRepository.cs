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

        Task<Patient> GetPatient(int id, bool? withRecords = false);

        Task<Patient> EditPatient(Patient patient);

        List<Patient> PatientsWithSimilarDisease(int patientId);

        Task<int> PatchPatient(int id, JsonPatchDocument<Patient> patient);


        Task<PagedList<PatientsForListDto>> GetUnAssignedPatientsToDoctor(int doctorId, PaginationParams paginationParams);




    }
}
