using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using ICareAPI.Dtos;
using ICareAPI.Helpers;
using ICareAPI.Helpers.Pagination;
using ICareAPI.Models;
using ICareAPI.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ICareAPI.Controllers
{
    [Route("api/doctors")]
    [ApiController]
    [Authorize]
    [ServiceFilter(typeof(LogUserAcitivity))]

    public class DoctorsController : ControllerBase
    {
        private readonly IDoctorRepository _repo;
        private readonly IPatientDoctorRepository _patientDoctorRepo;
        private readonly IMapper _mapper;

        public DoctorsController(
            IDoctorRepository doctorRepository,
              IMapper mapper,
          IPatientDoctorRepository patientDoctorRepository
          )
        {
            _mapper = mapper;
            _patientDoctorRepo = patientDoctorRepository;
            _repo = doctorRepository;

        }

        // GET api/doctor
        [HttpGet]
        public async Task<IActionResult> GetDoctors([FromQuery] PaginationParams paginationParams)
        {

            var doctors = await _repo.GetDoctors(paginationParams);

            var doctorsForReturn = _mapper.Map<IList<DoctorForListDto>>(doctors);

            HttpContext.Response.AddPagination(doctors.CurrnetPage, doctors.PageSize, doctors.TotalCount, doctors.TotalPages);


            return Ok(doctorsForReturn);
        }

        // GET api/doctor/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDoctorById(int id, bool withAssignedPatients, bool withRecords)
        {


            if (!withAssignedPatients)
            {

                var doctor = await _repo.GetDoctor(id);

                return Ok(doctor);

            }
            else
            {
                var patientDoctors = await _patientDoctorRepo.GetAssignedPatientsToDoctorId(id, withRecords);

                return Ok(patientDoctors);


            }
        }

        // POST api/doctor
        [HttpPost]
        public async Task<IActionResult> AddDoctor(DoctorForAddDto doctor)
        {


            if (ModelState.IsValid)
            {

                var addedDoctor = await _repo.AddDoctor(_mapper.Map<Doctor>(doctor));
                return Ok(addedDoctor);
            }
            else
            {
                return BadRequest();
            }



        }

        // TODO make patch method
        // PUT api/doctor/5
        // [HttpPut("{id}")]
        // public void PutDoctor(int id, Doctor doctor)
        // {
        // }

        // DELETE api/doctor/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteDoctor(int id)
        {

            var deleted = await _repo.DeleteDocotr(id);

            return Ok(deleted);
        }




        [HttpPost("{doctorId}/{patientId}")]
        public async Task<ActionResult> AssignPatient(int doctorId, int patientId)
        {

            var patientDoctor = await _patientDoctorRepo.AddPatientDoctor(doctorId, patientId);

            return Ok(patientDoctor);

        }


    }
}