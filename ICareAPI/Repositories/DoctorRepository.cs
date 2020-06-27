using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ICareAPI.Helpers;
using ICareAPI.Helpers.Pagination;
using ICareAPI.Middlewares;
using ICareAPI.Models;
using Microsoft.EntityFrameworkCore;
using static ICareAPI.constants.Enums;

namespace ICareAPI.Repositories
{

    public class DoctorRepository : IDoctorRepository
    {
        private readonly DataContext _context;
        private readonly EntityType _entityTypeDoctor;
        public DoctorRepository(DataContext dataContext)
        {
            _context = dataContext;
            _entityTypeDoctor = EntityType.doctor;
        }

        public async Task<Doctor> AddDoctor(Doctor doctor)
        {

            ExceptionThrowers.ThrowErrorIfEntiryExist(_entityTypeDoctor, _context, doctor.OfficialId);

            var newDoctor = await _context.Doctors.AddAsync(doctor);

            await _context.SaveChangesAsync();

            return newDoctor.Entity;
        }

        public async Task<Doctor> DeleteDocotr(int id)
        {

            ExceptionThrowers.ThrowErrorIfEntiryNotExist(_entityTypeDoctor, _context, id);

            var doctor = await GetDoctor(id);

            _context.Doctors.Remove(doctor);

            await _context.SaveChangesAsync();

            return doctor;
        }

        public Task<Doctor> EditDoctor(Doctor doctor)
        {
            throw new NotImplementedException();
        }

        public async Task<Doctor> GetDoctor(int id)
        {
            ExceptionThrowers.ThrowErrorIfNotValidId(id);

            var doctor = await _context.Doctors.Include(d => d.PatientDoctors)
            .ThenInclude(d => d.Patient)
            .FirstOrDefaultAsync(d => d.Id == id);

            if (doctor == null)
            {
                throw new NotFoundException("Doctor not found");
            }


            return doctor;
        }



        public async Task<PagedList<Doctor>> GetDoctors(PaginationParams paginationParams)
        {
            var doctors = await PagedList<Doctor>.CreatePagedAsync(_context.Doctors.Include(d => d.PatientDoctors), paginationParams.PageNumber, paginationParams.PageSize);

            return doctors;

        }


    }


}