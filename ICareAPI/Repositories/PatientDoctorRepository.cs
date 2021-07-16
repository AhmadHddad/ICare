using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using ICareAPI.Helpers;
using ICareAPI.Middlewares;
using ICareAPI.Models;
using Microsoft.EntityFrameworkCore;
using ICareAPI.Dtos;
using static ICareAPI.constants.Enums;
using ICareAPI.Helpers.Pagination;
using Z.EntityFramework.Plus;
using ICareAPI.Data;

namespace ICareAPI.Repositories
{
    public class PatientDoctorRepository : IPatientDoctorRepository
    {
        private readonly DataContext _context;
        private readonly IPatientRepository _patientRepo;
        private readonly IDoctorRepository _doctorRepo;
        private readonly IMapper _mapper;

        public PatientDoctorRepository(DataContext context,
         IPatientRepository patientRepository,
          IDoctorRepository doctorRepository,
          IMapper mapper)
        {
            _context = context;
            _patientRepo = patientRepository;
            _doctorRepo = doctorRepository;
            _mapper = mapper;
        }
        public async Task<PatientDoctor> AddPatientDoctor(int doctorId, int patientId)
        {

            ExceptionThrowers.ThrowErrorIfEntityNotExist(EntityType.doctor, _context, doctorId);

            ExceptionThrowers.ThrowErrorIfEntityNotExist(EntityType.patient, _context, patientId);


            if (await GetPatientDoctor(doctorId, patientId) != null)
            {
                throw new BadRequestException("This doctor is already assigned for this patient");
            }

            var doctor = await _doctorRepo.GetDoctorAsync(doctorId);
            var patient = await _patientRepo.GetPatientAsync(patientId);


            var patientDoctor = new PatientDoctor()
            { DoctorId = doctorId, PatientId = patientId, Doctor = doctor, Patient = patient };

            var newPatientDoctor = await _context.PatientDoctors.AddAsync(patientDoctor);

            await _context.SaveChangesAsync();

            return newPatientDoctor.Entity;

        }
        public async Task<List<PatientDoctor>> GetAssignedDoctorsToPatientId(int patientId, bool? withPatientRecords)
        {

            ExceptionThrowers.ThrowErrorIfEntityNotExist(EntityType.patient, _context, patientId);

            var patientsForThisDoctor = _context.PatientDoctors.Where(d => d.PatientId == patientId)
                .Include(d => d.Doctor)
                .Include(p => p.Patient);

            if (withPatientRecords == true)
            {

                patientsForThisDoctor.Include(p => p.Patient.Records);
            }

            return await patientsForThisDoctor.ToListAsync();
        }

        public async Task<List<PatientDoctor>> GetAssignedPatientsDoctors(bool? withPatientRecords)
        {

            var patientsDoctors = _context.PatientDoctors
                .Include(d => d.Doctor)
                .Include(p => p.Patient);

            if (withPatientRecords == true)
            {
                patientsDoctors.Include(p => p.Patient.Records);
            }

            return await patientsDoctors.ToListAsync(); ;
        }

        public async Task<PagedList<PatientWithAssignedDoctorsDto>> GetAssignedPatientsToDoctorId(int doctorId, PaginationParams paginationParams)
        {
            ExceptionThrowers.ThrowErrorIfEntityNotExist(EntityType.doctor, _context, doctorId);

            var patientsForThisDoctor = _context.PatientDoctors
             .Where(d => d.DoctorId == doctorId && d.Archived == false)
             .Select(d => d.Patient)
             .IncludeFilter(x => x.PatientDoctors.Where(pd => pd.Archived == false))
             .Include(i => i.Records);

            var pagedList = await PagedList<Patient>.CreatePagedAsync(patientsForThisDoctor, paginationParams.PageNumber, paginationParams.PageSize);


            var pagedPatientsList = PagedListConverter<Patient, PatientWithAssignedDoctorsDto>.Convert(pagedList, in _mapper);


            return pagedPatientsList;
        }

        public async Task<PatientDoctor> GetPatientDoctor(int doctorId, int patientId, bool? withPatientRecords = false)
        {

            ExceptionThrowers.ThrowErrorIfEntityNotExist(EntityType.doctor, _context, doctorId);

            ExceptionThrowers.ThrowErrorIfEntityNotExist(EntityType.patient, _context, patientId);


            var patientDoctor = _context.PatientDoctors
            .Where(p => p.PatientId == patientId && p.DoctorId == doctorId && p.Archived == false)
            .Include(p => p.Patient);


            if (withPatientRecords == true)
            {
                patientDoctor.Include(p => p.Patient.Records);
            }

            return await patientDoctor.FirstOrDefaultAsync();
        }

        public async Task<PatientDoctor> RemovePatientDoctor(int doctorId, int patientId)
        {

            ExceptionThrowers.ThrowErrorIfEntityNotExist(EntityType.doctor, _context, doctorId);

            ExceptionThrowers.ThrowErrorIfEntityNotExist(EntityType.patient, _context, patientId);


            var patientDoctor = await GetPatientDoctor(doctorId, patientId, false);


            if (patientDoctor == null || patientDoctor.Archived == true) throw new BadRequestException("There is no assigned relatoinship");



            patientDoctor.Archived = true;
            patientDoctor.ArchivedDate = DateTime.Now;

            await _context.SaveChangesAsync();

            return patientDoctor;

        }


    }

}