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
using ICareAPI.Dtos;
using AutoMapper;

namespace ICareAPI.Repositories
{
    public class PatientRepository : IPatientRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly EntityType _entityTypePatient;



        public PatientRepository(
            DataContext context,
            IMapper mapper)
        {
            _mapper = mapper;
            _context = context;

            _entityTypePatient = EntityType.patient;
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

            ExceptionThrowers.ThrowErrorIfEntityNotExist(_entityTypePatient, _context, patient.Id);


            patient.Archived = true;
            patient.ArchivedDate = DateTime.Now;

            await _context.SaveChangesAsync();

            return patient;
        }

        public async Task<Patient> EditPatient(Patient patient)

        {

            if (patient.OfficialId == null) throw new InternalServerException("OfficialId is null");

            ExceptionThrowers.ThrowErrorIfEntityNotExist(_entityTypePatient, _context, patient.Id);

            var patientToBeUpdated = await _context.Patients.FirstOrDefaultAsync(p => p.Id == patient.Id);

            _context.Attach(patientToBeUpdated).CurrentValues.SetValues(patient);


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
                var patients = _context.Patients.OrderByDescending(p => p.Created).Include(p => p.Records);

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


        //TODO improve performance
        public List<Patient> PatientsWithSimilarDisease(int patientId)
        {

            ExceptionThrowers.ThrowErrorIfEntityNotExist(_entityTypePatient, _context, patientId);

            var patientRecord = _context.Records.Where(p => p.PatientId == patientId).ToList();
            var patientsWithSimilarDiseasesList = new List<Patient>() { };

            if (patientRecord.Count > 0)
            {
                var DbF = Microsoft.EntityFrameworkCore.EF.Functions;
                foreach (var item in patientRecord)
                {
                    var patientIds = _context.Records.AsEnumerable<Record>()
                    .Where(rec => rec.DiseaseName.Contains(item.DiseaseName, StringComparison.CurrentCultureIgnoreCase) && rec.PatientId != patientId)
                    .Select(r => r.PatientId).ToArray();

                    var patientsWithThisDieseas = _context.Patients.AsEnumerable().Where(t => patientIds.Contains(t.Id)).ToList();

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

        public async Task<PagedList<PatientsForListDto>> GetUnAssignedPatientsToDoctor(int doctorId, PaginationParams paginationParams)
        {

            ExceptionThrowers.ThrowErrorIfEntityNotExist(EntityType.doctor, _context, doctorId);


            var unAssignedPatients = _context.Patients.Where(P => !P.PatientDoctors.Any(pd => pd.DoctorId == doctorId && pd.Archived == false));

            var pagedList = await PagedList<Patient?>.CreatePagedAsync(unAssignedPatients, paginationParams.PageNumber, paginationParams.PageSize);

            var pagedPatientsList = PagedListConverter<Patient?, PatientsForListDto>.Convert(pagedList, in _mapper);


            return pagedPatientsList;

        }
    }
}
