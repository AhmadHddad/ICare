using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ICareAPI.Middlewares;
using ICareAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace ICareAPI.Repositories
{
    public class PatientDoctorRepository : IPatientDoctorRepository
    {
        private readonly DataContext _context;
        private readonly IPatientRepository _patientRepo;
        private readonly IDoctorRepository _doctorRepo;

        private enum CheckObjType
        {
            both,
            patinet,
            doctor
        }

        public PatientDoctorRepository(DataContext context,
         IPatientRepository patientRepository,
          IDoctorRepository doctorRepository)
        {
            _context = context;
            _patientRepo = patientRepository;
            _doctorRepo = doctorRepository;
        }
        public async Task<PatientDoctor> AddPatientDoctor(int doctorId, int patientId)
        {

            CheckForPatientOrDoctor(patientId, doctorId);

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

            CheckForPatientOrDoctor(patientId, 0, CheckObjType.patinet);

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

        public async Task<List<PatientDoctor>> GetAssignedPatientsToDoctorId(int doctorId, bool? withPatientRecords)
        {

            CheckForPatientOrDoctor(0, doctorId, CheckObjType.doctor);


            // TODO what should be returned is a doctor with a list of assinged patients 

            var patientsForThisDoctor = _context.PatientDoctors
            .Where(d => d.DoctorId == doctorId)
            .Include(d => d.Doctor)
            .Include(p => p.Patient)
            .ThenInclude(doc => doc.PatientDoctors);



            if (withPatientRecords == true)
            {
                patientsForThisDoctor.Include(p => p.Patient.Records);
            }


            return await patientsForThisDoctor.ToListAsync(); ;

        }


        public async Task<PatientDoctor> GetPatientDoctor(int doctorId, int patientId, bool? withPatientRecords = false)
        {

            CheckForPatientOrDoctor(patientId, doctorId);

            var patientDoctor = _context.PatientDoctors
            .Where(p => p.PatientId == patientId && p.DoctorId == doctorId)
            .Include(d => d.Doctor)
            .Include(p => p.Patient);

            if (withPatientRecords == true)
            {
                patientDoctor.Include(p => p.Patient.Records);
            }

            return await patientDoctor.FirstOrDefaultAsync();
        }

        public async Task<PatientDoctor> RemovePatientDoctor(int doctorId, int patientId)
        {

            CheckForPatientOrDoctor(patientId, doctorId);

            var patientDoctor = await GetPatientDoctor(doctorId, patientId, false);



            _context.PatientDoctors.Remove(patientDoctor);

            await _context.SaveChangesAsync();

            return patientDoctor;

        }


        private async void CheckForPatientOrDoctor(int patientId, int doctorId, CheckObjType checkObj = CheckObjType.both)
        {

            Patient patient = await _patientRepo.GetPatient(patientId);
            Doctor doctor = await _doctorRepo.GetDoctor(doctorId);

            if (checkObj == CheckObjType.both)
            {

                if (doctor == null)
                {
                    throw new BadRequestException("No doctor with this id");
                }

                if (patient == null)
                {
                    throw new BadRequestException("No patient with this id");
                }
            }

            else if (checkObj == CheckObjType.patinet && patient == null)
            {
                throw new BadRequestException("No patient with this id");
            }
            else if (checkObj == CheckObjType.doctor && doctor == null)
            {
                throw new BadRequestException("No doctor with this id");
            }

        }
    }




}