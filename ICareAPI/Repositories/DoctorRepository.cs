using System;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using ICareAPI.Dtos;
using ICareAPI.Helpers;
using ICareAPI.Helpers.Pagination;
using ICareAPI.Middlewares;
using ICareAPI.Models;
using Microsoft.EntityFrameworkCore;
using static ICareAPI.constants.Enums;
using Z.EntityFramework.Plus;
using ICareAPI.Data;

namespace ICareAPI.Repositories
{

    public class DoctorRepository : IDoctorRepository
    {
        private readonly DataContext _context;
        private readonly EntityType _entityTypeDoctor;
        private readonly IMapper _mapper;
        public DoctorRepository(DataContext dataContext, IMapper mapper)
        {
            _mapper = mapper;
            _context = dataContext;
            _entityTypeDoctor = EntityType.doctor;
        }

        public async Task<Doctor> AddDoctorAsync(Doctor doctor)
        {

            ExceptionThrowers.ThrowErrorIfEntityExist(_entityTypeDoctor, _context, doctor.OfficialId);

            var newDoctor = await _context.Doctors.AddAsync(doctor);

            await _context.SaveChangesAsync();

            return newDoctor.Entity;
        }

        public async Task<Doctor> DeleteDoctorAsync(int id)
        {

            ExceptionThrowers.ThrowErrorIfEntityNotExist(_entityTypeDoctor, _context, id);

            var doctor = await GetDoctorAsync(id);

            doctor.Archived = true;
            doctor.ArchivedDate = DateTime.Now;


            await _context.SaveChangesAsync();

            return doctor;
        }

        public async Task<Doctor> EditDoctorAsync(Doctor doctor)
        {

            if (doctor.OfficialId == null) throw new InternalServerException("OfficialId is null");

            var doctorToBeUpdated = await GetDoctorAsync(doctor.Id);


            ExceptionThrowers.ThrowErrorIfEntityNotExist(EntityType.doctor, _context, doctor.Id);

            _context.Entry(doctorToBeUpdated).CurrentValues.SetValues(doctor);

            try
            {
                await _context.SaveChangesAsync();

                return doctor;

            }
            catch (System.Exception error)
            {

                throw new InternalServerException($"Could not save - ${error.Message}");
            }


        }

        public async Task<Doctor> GetDoctorAsync(int id)
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



        public async Task<PagedList<Doctor>> GetDoctorsAsync(PaginationParams paginationParams)
        {
            var doctors = await PagedList<Doctor>.CreatePagedAsync(_context.Doctors.OrderByDescending(d => d.Created).Include(d => d.PatientDoctors).AsNoTracking(), paginationParams.PageNumber, paginationParams.PageSize);

            return doctors;

        }

        public async Task<PagedList<DoctorForListDto>> GetDoctorsListAsync(PaginationParams paginationParams)
        {

            var doctors = _context.Doctors.Where(d => d.Archived == false).OrderByDescending(d => d.Created)
            .IncludeFilter(d => d.PatientDoctors.Where(pd => pd.Archived == false));


            var pagedDoctors = await PagedList<Doctor>.CreatePagedAsync(doctors, paginationParams.PageNumber, paginationParams.PageSize);



            var doctorForList = PagedListConverter<Doctor, DoctorForListDto>.Convert(pagedDoctors, _mapper);

            return doctorForList;

        }


    }


}