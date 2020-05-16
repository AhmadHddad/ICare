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
        Task<Record> AddRecord(Record record);

        Task<Record> EditRecord(Record record);


        Task<List<Record>> GetPatientRecords(int patientId);


        Task<bool> RecordExists(int id);

        Task<int> PatchRecord(int id, JsonPatchDocument<Record> record);


        Task<Record> GetRecordById(int id);


    }
}
