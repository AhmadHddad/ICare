using Microsoft.AspNetCore.JsonPatch;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ICareAPI.Interfaces;
using ICareAPI.Models;
using ICareAPI.Data;
namespace ICareAPI.Repositories
{
    public class RecordRepository : IRecordRepository
    {
        private readonly DataContext _context;

        public RecordRepository(DataContext context)
        {
            _context = context;

        }


        public async Task<Record> AddRecordAsync(Record record)
        {


            record.Created = DateTime.Now;
            var newRec = await _context.Records.AddAsync(record);
            _context.SaveChanges();
            return newRec.Entity;
        }

        public async Task<Record> EditRecordAsync(Record record)
        {

            var recordToBeUpdated = await _context.Records.FirstOrDefaultAsync(r => r.Id == record.Id);

            record.PatientId = recordToBeUpdated.PatientId;

            _context.Entry(recordToBeUpdated).CurrentValues.SetValues(record);

            await _context.SaveChangesAsync();

            return record;

        }


        public async Task<List<Record>> GetPatientRecordsAsync(int patientId)
        {
            var patientRecords = await _context.Records.Where(r => r.PatientId == patientId).ToListAsync();

            return patientRecords;
        }

        public async Task<bool> RecordExistsAsync(int id)
        {
            var record = await _context.Records.FindAsync(id);

            if (record != null)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public async Task<Record> GetRecordByIdAsync(int id)
        {

            var record = await _context.Records.FindAsync(id);

            return record;
        }


        public async Task<int> PatchRecordAsync(int id, JsonPatchDocument<Record> record)
        {
            var recordForPatch = await GetRecordByIdAsync(id);

            record.ApplyTo(recordForPatch);

            var result = await _context.SaveChangesAsync();

            return result;
        }

    }
}
