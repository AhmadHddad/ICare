using Microsoft.AspNetCore.JsonPatch;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ICareAPI.Helpers;
using ICareAPI.Helpers.Pagination;
using ICareAPI.Models;
using System.Collections.ObjectModel;
using ICareAPI.Middlewares;
using static ICareAPI.constants.Enums;

namespace ICareAPI.Repositories
{
    public class PatientRepository : IPatientRepository
    {
        private readonly DataContext _context;
        private readonly EntityType _entityTypePatient;



        public PatientRepository(DataContext context)
        {
            _context = context;

            _entityTypePatient = EntityType.patinet;
        }

        public Patient AddPatient(Patient patient)
        {


            ExceptionThrowers.ThrowErrorIfEntiryExist(_entityTypePatient, _context, patient.OfficialId);

            patient.Created = DateTime.Now;
            // TODO Test this
            patient.Records = new Collection<Record>() { };
            var patientToBeCreated = _context.Patients.Add(patient).Entity;

            _context.SaveChanges();

            return patientToBeCreated;
        }



        public async Task<Patient> DeletePatient(Patient patient)
        {

            ExceptionThrowers.ThrowErrorIfEntiryNotExist(_entityTypePatient, _context, patient.Id);

            _context.Patients.Remove(patient);
            await _context.SaveChangesAsync();

            return patient;
        }

        public async Task<Patient> EditPatient(Patient patient)

        {

            if (patient.OfficialId == null) throw new InternalServerException("OfficialId is null");

            ExceptionThrowers.ThrowErrorIfEntiryNotExist(_entityTypePatient, _context, patient.Id);

            var patientToBeUpdated = await _context.Patients.FirstOrDefaultAsync(p => p.Id == patient.Id);

            _context.Entry(patientToBeUpdated).CurrentValues.SetValues(patient);


            await _context.SaveChangesAsync();

            return patient;

        }


        public async Task<Patient> GetPatient(int id, bool? withRecords = false)
        {


            ExceptionThrowers.ThrowErrorIfNotValidId(id);

            Patient patient;

            if (withRecords == true)
            {

                patient = await _context.Patients.Include(p => p.Records).FirstOrDefaultAsync(p => p.Id == id);
            }
            else
            {
                patient = await _context.Patients.FindAsync(id);

            }

            if (patient == null)
            {

                throw new BadRequestException("Patient not found");
            }


            return patient;

        }

        public async Task<PagedList<Patient>> GetPatients(bool? withRecords, PaginationParams paginationParams)
        {



            if (withRecords == true)
            {
                var patients = _context.Patients.Include(p => p.Records);

                var pagedPatients = await PagedList<Patient>.CreatePagedAsync(patients, paginationParams.PageNumber, paginationParams.PageSize);

                return pagedPatients;
            }
            else
            {
                var patients = _context.Patients;

                var pagedPatients = await PagedList<Patient>.CreatePagedAsync(patients, paginationParams.PageNumber, paginationParams.PageSize);

                return pagedPatients;

            }
        }



        public async Task<List<Patient>> PatientsWithSimilarDisease(int patientId)
        {

            ExceptionThrowers.ThrowErrorIfEntiryNotExist(_entityTypePatient, _context, patientId);

            var patientRecord = _context.Records.Where(p => p.PatientId == patientId).ToList();
            var patientsWithSimilarDiseasesList = new List<Patient>() { };

            if (patientRecord.Count > 0)
            {
                foreach (var item in patientRecord)
                {
                    var patientIds = await _context.Records.Where(rec => rec.DiseaseName.Contains(item.DiseaseName, StringComparison.CurrentCultureIgnoreCase) && rec.PatientId != patientId).Select(r => r.PatientId).ToArrayAsync();
                    var patientsWithThisDieseas = await _context.Patients.Where(t => patientIds.Contains(t.Id)).ToListAsync();

                    patientsWithSimilarDiseasesList.AddRange(patientsWithThisDieseas);
                }


            }
            return patientsWithSimilarDiseasesList.Distinct().ToList();
        }

        public async Task<int> PatchPatient(int id, JsonPatchDocument<Patient> patient)
        {
            var patientToPatch = await GetPatient(id, false);

            patient.ApplyTo(patientToPatch);

            var result = await _context.SaveChangesAsync();

            return result;
        }


    }
}
