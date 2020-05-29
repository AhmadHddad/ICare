using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ICareAPI.Helpers;
using ICareAPI.Helpers.Pagination;
using ICareAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace ICareAPI.Repositories
{

    public class DoctorRepository : IDoctorRepository
    {
        private readonly DataContext _context;

        public DoctorRepository(DataContext dataContext)
        {
            _context = dataContext;
        }

        public async Task<Doctor> AddDoctor(Doctor doctor)
        {
            var newDoctor = await _context.Doctors.AddAsync(doctor);

            await _context.SaveChangesAsync();

            return newDoctor.Entity;
        }

        public async Task<Doctor> DeleteDocotr(int id)
        {
            var doctor = await GetDoctor(id);

            _context.Doctors.Remove(doctor);

            await _context.SaveChangesAsync();

            return doctor;
        }

        public async Task<Doctor> GetDoctor(int id)
        {
            var doctor = await _context.Doctors.Include(d => d.PatientDoctors).FirstOrDefaultAsync(d => d.Id == id);

            return doctor;
        }

        public async Task<PagedList<Doctor>> GetDoctors(PaginationParams paginationParams)
        {
            var doctors = await PagedList<Doctor>.CreatePagedAsync(_context.Doctors.Include(d => d.PatientDoctors), paginationParams.PageNumber, paginationParams.PageSize);

            return doctors;

        }


    }


}