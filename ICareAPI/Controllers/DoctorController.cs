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
    [ServiceFilter(typeof(LogUserActivity))]

    public class DoctorsController : ControllerBase
    {
        private readonly IDoctorRepository _repo;
        private readonly IPatientDoctorRepository _patientDoctorRepo;
        private readonly IMapper _mapper;
        private readonly IPatientRepository _patientRepository;

        public DoctorsController(
            IDoctorRepository doctorRepository,
              IMapper mapper,
          IPatientDoctorRepository patientDoctorRepository,
            IPatientRepository patientRepository
          )
        {
            _patientRepository = patientRepository;
            _mapper = mapper;
            _patientDoctorRepo = patientDoctorRepository;
            _repo = doctorRepository;

        }

        // GET api/doctor
        [HttpGet]
        public async Task<IActionResult> GetDoctors([FromQuery] PaginationParams paginationParams)
        {

            var doctors = await _repo.GetDoctorsList(paginationParams);

            HttpContext.Response.AddPagination(doctors.CurrnetPage, doctors.PageSize, doctors.TotalCount, doctors.TotalPages);


            return Ok(doctors);
        }

        // GET api/doctor/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDoctorById(int id, bool withAssignedPatients = false)
        {

            var doctor = await _repo.GetDoctor(id);

            return Ok(doctor);

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

            var deleted = await _repo.DeleteDoctor(id);

            return Ok(deleted);
        }

        // DELETE api/doctor/assigned/5
        [HttpGet("{id}/assigned")]
        public async Task<ActionResult> GetAssignedPatients(int id, [FromQuery] PaginationParams pagination)
        {

            var patientDoctors = await _patientDoctorRepo.GetAssignedPatientsToDoctorId(id, pagination);

            HttpContext.Response.AddPagination(patientDoctors.CurrnetPage, patientDoctors.PageSize, patientDoctors.TotalCount, patientDoctors.TotalPages);


            return Ok(patientDoctors);
        }


        [HttpGet("{doctorId}/unAssigned")]
        public async Task<ActionResult> GetUnAssignedPatients(int doctorId, [FromQuery] PaginationParams paginationParams)
        {

            var unAssignedPatients = await _patientRepository.GetUnAssignedPatientsToDoctor(doctorId, paginationParams);

            HttpContext.Response.AddPagination(unAssignedPatients.CurrnetPage, unAssignedPatients.PageSize, unAssignedPatients.TotalCount, unAssignedPatients.TotalPages);


            return Ok(unAssignedPatients);

        }


        [HttpPost("{doctorId}/{patientId}")]
        public async Task<ActionResult> AssignPatient(int doctorId, int patientId)
        {

            var patientDoctor = await _patientDoctorRepo.AddPatientDoctor(doctorId, patientId);

            var patient = _mapper.Map<PatientsForListDto>(patientDoctor.Patient);

            return Ok(patient);

        }


        [HttpDelete("{doctorId}/{patientId}")]
        public async Task<IActionResult> RemovePatientDoctor(int doctorId, int patientId)
        {

            var removed = await _patientDoctorRepo.RemovePatientDoctor(doctorId, patientId);

            return Ok(removed);
        }


        [HttpPut]
        public async Task<ActionResult> EditDoctor(DoctorForEditDto doctorForEdit)
        {

            var doctor = await _repo.GetDoctor(doctorForEdit.Id);

            var mappedDoctor = _mapper.Map<DoctorForEditDto, Doctor>(doctorForEdit, doctor);

            return Ok(await _repo.EditDoctor(mappedDoctor));

        }

    }
}