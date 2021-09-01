using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using ICareAPI.Repositories;
using ICareAPI.Dtos;
using ICareAPI.Models;
using ICareAPI.Helpers.Pagination;
using ICareAPI.Helpers;

namespace ICareAPI.Controllers

{
    public class PatientsController : BaseController
    {
        private readonly IPatientRepository _repo;
        private readonly IMapper _mapper;
        private readonly IPatientDoctorRepository _patientDoctorRepo;

        public PatientsController(IPatientRepository repo, IMapper mapper, IPatientDoctorRepository patientDoctor)
        {
            _repo = repo;
            _mapper = mapper;
            _patientDoctorRepo = patientDoctor;
        }

        [HttpGet]
        public async Task<IActionResult> GetPatients(bool? withRecords, [FromQuery] PaginationParams paginationParams)
        {
            var pations = await _repo.GetPatientsAsync(true, paginationParams);

            if (pations != null && withRecords == true)
            {
                Response.AddPagination(pations.CurrnetPage, pations.PageSize, pations.TotalCount, pations.TotalPages);
                return Ok(pations);

            }
            else if (pations != null)
            {
                Response.AddPagination(pations.CurrnetPage, pations.PageSize, pations.TotalCount, pations.TotalPages);
                var patientsToReturn = _mapper.Map<IList<PatientsForListDto>>(pations);
                return Ok(patientsToReturn);
            }
            else
            {
                return NoContent();
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPatientById(int id, bool? withRecords)
        {
            var pation = await _repo.GetPatientAsync(id, withRecords);

            var patientToReturn = _mapper.Map<PatientForDetailsDto>(pation);
            return Ok(patientToReturn);

        }

        [HttpGet("statistics/{id}")]

        public async Task<IActionResult> GetPatientsStatistics(int id)
        {
            var patient = await _repo.GetPatientAsync(id, true);

            var mappedPatient = _mapper.Map<PatientForDetailsDto>(patient);

            var patientForReturn = _mapper.Map<StatisticsDto>(mappedPatient);
            patientForReturn.PatientsWithSimilarDiseases = _repo.PatientsWithSimilarDisease(id);



            return Ok(patientForReturn);
        }



        [HttpPost]
        public IActionResult AddPatient(PatientForAddDto patient)
        {

            var newPatientToAdd = _mapper.Map<Patient>(patient);
            var newPatient = _repo.AddPatient(newPatientToAdd);

            return Ok(newPatient);
        }

        [HttpPut]
        public async Task<IActionResult> EditPatient(PatientForEditDto patient)
        {

            if (ModelState.IsValid)
            {

                var patientToEdit = await _repo.GetPatientAsync(patient.Id);
                var mappedPatient = _mapper.Map<PatientForEditDto, Patient>(patient, patientToEdit);
                var newPation = await _repo.EditPatientAsync(mappedPatient);

                return Ok(patientToEdit);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePatient(int id)
        {
            var patientForDelete = await _repo.GetPatientAsync(id, false);


            var deletedPatient = await _repo.DeletePatientAsync(patientForDelete);

            return Ok(deletedPatient);


        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> PatchPatient(int id, JsonPatchDocument<PatientForEditDto> patient)
        {

            var patientToPatch = _repo.GetPatientAsync(id, false).Result;

            if (patientToPatch != null)
            {

                foreach (var item in patient.Operations)
                {
                    if (item.path == "/officialId")
                    {
                        return BadRequest("You can't change officialId");
                    }
                    else if (item.path == "/id" && item.value.ToString() != id.ToString())
                    {
                        return BadRequest("You can't change Id");

                    }
                }

                var patientForRepo = _mapper.Map<JsonPatchDocument<Patient>>(patient);

                var x = await _repo.PatchPatientAsync(id, patientForRepo);

                if (x == 0)
                {
                    return Accepted("Nothing changed");
                }
                else
                {

                    return Ok("Updated successfully");
                }
            }
            else
            {
                return BadRequest();
            }
        }


        [HttpPost("{patientId}/{doctorId}")]
        public async Task<IActionResult> AssginDoctor(int patientId, int doctorId)
        {
            var assinge = await _patientDoctorRepo.AddPatientDoctor(doctorId, patientId);

            return Ok(assinge);
        }

        [HttpGet("{patientId}/{doctorId}")]
        public async Task<IActionResult> GetAssginedDoctor(int patientId, int doctorId, bool? withPatientRecords)
        {

            var assinged = await _patientDoctorRepo.GetPatientDoctor(doctorId, patientId, withPatientRecords);

            return Ok(assinged);
        }

        [HttpDelete("{patientId}/{doctorId}")]
        public async Task<IActionResult> RemovePatientDoctor(int patientId, int doctorId)
        {

            var removed = await _patientDoctorRepo.RemovePatientDoctor(doctorId, patientId);

            return Ok(removed);
        }


    }
}
