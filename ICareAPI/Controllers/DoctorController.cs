using System;
using System.Collections.Generic;
using System.Linq;
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
        private readonly IPatientRepository _patientRepo;
        private readonly IMapper _mapper;

        public DoctorsController(
            IDoctorRepository doctorRepository,
              IMapper mapper,
          IPatientDoctorRepository patientDoctorRepository,
          IPatientRepository patientRepository
          )
        {
            _mapper = mapper;
            _patientDoctorRepo = patientDoctorRepository;
            _patientRepo = patientRepository;
            _repo = doctorRepository;

        }

        // GET api/doctor
        [HttpGet]
        public async Task<IActionResult> GetDoctors([FromQuery] PaginationParams paginationParams)
        {

            var doctors = await _repo.GetDoctors(paginationParams);

            HttpContext.Response.AddPagination(doctors.CurrnetPage, doctors.PageSize, doctors.TotalCount, doctors.TotalPages);


            return Ok(doctors);
        }

        // GET api/doctor/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDoctorById(int id)
        {
            var doctor = await _repo.GetDoctor(id);

            if (doctor == null)
            {
                return BadRequest("No doctor with this id");
            }
            else
            {

                return Ok(doctor);

            }
        }

        // POST api/doctor
        [HttpPost]
        public async Task<IActionResult> PostDoctor(DoctorForAddDto doctor)
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

            if (await _repo.GetDoctor(id) == null)
            {
                return BadRequest("Doctor is not found!");
            }

            var deleted = await _repo.DeleteDocotr(id);

            return Ok(deleted);
        }


        [HttpPost("{doctorId}/{patientId}")]

        public async Task<ActionResult> AssignPatient(int doctorId, int patientId)
        {
            if (await _repo.GetDoctor(doctorId) == null)
            {
                return BadRequest("Doctor is not found!");

            }

            if (await _patientRepo.GetPatient(patientId, false) == null)
            {
                return BadRequest("Patient is not found!");

            }

            var patientDoctor = await _patientDoctorRepo.AddPatientDoctor(doctorId, patientId);

            return Ok(patientDoctor);

        }

    }
}