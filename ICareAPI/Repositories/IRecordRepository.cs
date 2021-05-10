using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.JsonPatch;
using ICareAPI.Dtos;
using ICareAPI.Models;

namespace ICareAPI.Interfaces
{
    public interface IRecordRepository
    {
        Task<Record> AddRecordAsync(Record record);

        Task<Record> EditRecordAsync(Record record);


        Task<List<Record>> GetPatientRecordsAsync(int patientId);


        Task<bool> RecordExistsAsync(int id);

        Task<int> PatchRecordAsync(int id, JsonPatchDocument<Record> record);


        Task<Record> GetRecordByIdAsync(int id);


    }
}
