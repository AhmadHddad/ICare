using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using ICareAPI.Repositories;
using ICareAPI.Dtos;
using ICareAPI.Interfaces;
using ICareAPI.Models;

namespace ICareAPI.Controllers
{
    [Route("api/records")]
    //[Authorize]
    [ApiController]
    public class RecordsController : ControllerBase
    {
        private readonly IRecordRepository _repo;
        private readonly IMapper _mapper;
        private readonly IPatientRepository _patientRepo;

        public RecordsController(IRecordRepository repo, IMapper mapper, IPatientRepository patientRepo)
        {
            _repo = repo;
            _mapper = mapper;

            _patientRepo = patientRepo;
        }

        [HttpGet("patient/{id}")]
        public async Task<IActionResult> GetPatientRecords(int patientId)
        {

            var records = await _repo.GetPatientRecords(patientId);

            if (records != null)
            {

                List<RecordForAddEditDetails> targetList = new List<RecordForAddEditDetails>(records.Cast<RecordForAddEditDetails>());

                return Ok(targetList);
            }
            else
            {
                return NoContent();
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddRecord(RecordForAddEditDetails record)
        {

            if (record.Id > 0)
            {
                return BadRequest("Record already exits");
            }
            else if (await _patientRepo.GetPatient(record.PatientId, false) == null)
            {
                return BadRequest("Patient does not exist");

            }
            else
            {
                var newRecord = _repo.AddRecord(_mapper.Map<Record>(record)).Result;

                var patientToReturn = _mapper.Map<RecordForAddEditDetails>(newRecord);

                return Ok(patientToReturn);
            }
        }

        [HttpPut]
        public async Task<IActionResult> EditRecord(RecordForAddEditDetails record)
        {
            var patientToEdit = await _patientRepo.GetPatient(record.PatientId, true);

            var patientRecord = patientToEdit.Records.FirstOrDefault(rec => rec.Id == record.Id);

            if (patientRecord == null)
            {
                return BadRequest("This record is not for this patient");
            }

            if (!await _repo.RecordExists(record.Id))
            {
                return BadRequest("Record does not exist");
            }
            else if (patientToEdit == null)
            {
                return BadRequest("Patient does not exist");

            }
            else
            {

                var newRecord = _repo.EditRecord(_mapper.Map<Record>(record)).Result;


                return Ok(newRecord);
            }
        }



        [HttpGet("{id}")]

        public async Task<IActionResult> GetRecordById(int id)
        {

            var record = await _repo.GetRecordById(id);

            if (record != null)
            {
                return Ok(record);
            }
            else
            {
                return NoContent();
            }
        }

        public async Task<IActionResult> PatchRecord(int id, JsonPatchDocument<RecordForAddEditDetails> record)
        {
            var recordToPatch = await _repo.GetRecordById(id);

            if (recordToPatch == null)
            {
                return BadRequest("No record with this Id");
            }
            else
            {
                foreach (var item in record.Operations)
                {
                    if (item.path == "/patientId")
                    {
                        return BadRequest("You can't change patient id");

                    }
                }

                var result = await _repo.PatchRecord(id, _mapper.Map<JsonPatchDocument<Record>>(record));

                if (result == 0)
                {
                    return Accepted("Nothing changed");

                }
                else
                {
                    return Ok("Updated successfully");

                }
            }

        }

    }
}