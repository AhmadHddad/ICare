using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ICareAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace ICareAPI.Repositories
{
    public class PatientDoctorRepository : IPatientDoctorRepository
    {
        private readonly DataContext _context;

        public PatientDoctorRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<PatientDoctor> AddPatientDoctor(int dcotorId, int patientId)
        {


            var patientDoctor = new PatientDoctor() { DoctorId = dcotorId, PatientId = patientId };

            var newPatientDoctor = await _context.PatientDoctors.AddAsync(patientDoctor);

            await _context.SaveChangesAsync();

            return newPatientDoctor.Entity;

        }
        public async Task<List<PatientDoctor>> GetAssignedDoctorsToPatientId(int patientId, bool? withPatientRecords)
        {
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

        public async Task<List<PatientDoctor>> GetAssignedPatientsToDoctorId(int dcotorId, bool? withPatientRecords)
        {
            var patientsForThisDoctor = _context.PatientDoctors
            .Where(d => d.DoctorId == dcotorId)
            .Include(d => d.Doctor)
            .Include(p => p.Patient);


            if (withPatientRecords == true)
            {
                patientsForThisDoctor.Include(p => p.Patient.Records);
            }


            return await patientsForThisDoctor.ToListAsync(); ;

        }


        public async Task<PatientDoctor> GetPatientDoctor(int dcotorId, int patientId, bool? withPatientRecords)
        {
            var patientDoctor = _context.PatientDoctors
            .Where(p => p.PatientId == patientId && p.DoctorId == dcotorId)
            .Include(d => d.Doctor)
            .Include(p => p.Patient);

            if (withPatientRecords == true)
            {
                patientDoctor.Include(p => p.Patient.Records);
            }

            return await patientDoctor.FirstOrDefaultAsync();
        }

        public async Task<PatientDoctor> RemovePatientDoctor(int dcotorId, int patientId)
        {
            var patientDoctor = await GetPatientDoctor(dcotorId, patientId, false);

            _context.PatientDoctors.Remove(patientDoctor);

            await _context.SaveChangesAsync();

            return patientDoctor;

        }
    }




}