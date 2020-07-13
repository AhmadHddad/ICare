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

            ExceptionThrowers.ThrowErrorIfEntityNotExist(EntityType.patinet, _context, patientId);


            if (await GetPatientDoctor(doctorId, patientId) != null)
            {
                throw new BadRequestException("This doctor is already assigned for this patient");
            }

            var doctor = await _doctorRepo.GetDoctor(doctorId);
            var patient = await _patientRepo.GetPatient(patientId);


            var patientDoctor = new PatientDoctor()
            { DoctorId = doctorId, PatientId = patientId, Doctor = doctor, Patient = patient };

            var newPatientDoctor = await _context.PatientDoctors.AddAsync(patientDoctor);

            await _context.SaveChangesAsync();

            return newPatientDoctor.Entity;

        }
        public async Task<List<PatientDoctor>> GetAssignedDoctorsToPatientId(int patientId, bool? withPatientRecords)
        {

            ExceptionThrowers.ThrowErrorIfEntityNotExist(EntityType.patinet, _context, patientId);

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

        public async Task<List<PatientWithAssignedDoctorsDto>> GetAssignedPatientsToDoctorId(int doctorId)
        {
            ExceptionThrowers.ThrowErrorIfEntityNotExist(EntityType.doctor, _context, doctorId);

            var patientsForThisDoctor = _context.PatientDoctors
            .Where(d => d.DoctorId == doctorId)
            .Include(p => p.Patient)
            .Select(d => d.Patient)
            .Include(x => x.PatientDoctors)
            .Include(i => i.Records);


            var mappedPatients = _mapper.Map<List<PatientWithAssignedDoctorsDto>>(await patientsForThisDoctor.ToListAsync());

            return mappedPatients;
        }


        public async Task<PatientDoctor> GetPatientDoctor(int doctorId, int patientId, bool? withPatientRecords = false)
        {

            ExceptionThrowers.ThrowErrorIfEntityNotExist(EntityType.doctor, _context, doctorId);

            ExceptionThrowers.ThrowErrorIfEntityNotExist(EntityType.patinet, _context, patientId);


            var patientDoctor = _context.PatientDoctors
            .Where(p => p.PatientId == patientId && p.DoctorId == doctorId)
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

            ExceptionThrowers.ThrowErrorIfEntityNotExist(EntityType.patinet, _context, patientId);


            var patientDoctor = await GetPatientDoctor(doctorId, patientId, false);


            if (patientDoctor == null) throw new BadRequestException("There is no assigned relatoinship");


            _context.PatientDoctors.Remove(patientDoctor);

            await _context.SaveChangesAsync();

            return patientDoctor;

        }


    }




}