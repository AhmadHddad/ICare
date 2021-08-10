using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ICareAPI.Data;
using ICareAPI.Models;
using Bogus;
using System.Collections.ObjectModel;
using Microsoft.AspNetCore.Authorization;

namespace ICareAPI.Controllers
{
    [Route("api/patientTest")]
    [ApiController]
    [AllowAnonymous]
    public class TestPatientsController : ControllerBase
    {
        private readonly DataContext _context;

        public TestPatientsController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Patients1
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Patient>>> GetPatients()
        {
            return await _context.Patients.Include(p => p.Records).ToListAsync();
        }

        // GET: api/Patients1/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Patient>> GetPatient(int id)
        {
            var patient = await _context.Patients.FindAsync(id);

            if (patient == null)
            {
                return NotFound();
            }

            return patient;
        }

        // PUT: api/Patients1/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPatient(int id, Patient patient)
        {
            if (id != patient.Id)
            {
                return BadRequest();
            }
            _context.Patients.Update(patient);
            _context.Entry(patient).Property("OfficialId").IsModified = false;


            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PatientExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Patients1
        [HttpPost]
        public async Task<ActionResult<Patient>> PostPatient(Patient patient)
        {
            _context.Patients.Add(patient);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPatient", new { id = patient.Id }, patient);
        }

        // DELETE: api/Patients1/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Patient>> DeletePatient(int id)
        {
            var patient = await _context.Patients.FindAsync(id);
            if (patient == null)
            {
                return NotFound();
            }

            _context.Patients.Remove(patient);
            await _context.SaveChangesAsync();

            return patient;
        }

        private bool PatientExists(int id)
        {
            return _context.Patients.Any(e => e.Id == id);
        }



        [HttpGet("SEED_THIS")]
        public void SeedData()
        {
            try
            {


                var specialty = new[] { "Heart", "Brain", "Bones", "Muscles", "Women" };

                var department = new[] { "Cardiology", "Burn Center", "Anesthetics", "Admissions", "Accident and emergency (A&E)" };

                var university = new[] { "Massachusetts Institute of Technology", "Harvard University", "Stanford University", "California Institute of Technology", "University of Cambridge" };
                var OfficialId = new List<string>();

                for (int i = 0; i < 200; i++)
                {
                    Random r = new Random();
                    int genRand = r.Next(100000000, 999999999);

                    OfficialId.Add(genRand.ToString());
                }

                OfficialId.Distinct();


                var patients = new Faker<Patient>()
                    .RuleFor(o => o.Archived, f => false)
                    .RuleFor(o => o.Created, f => DateTime.Now)
                    .RuleFor(o => o.DateOfBirth, f => f.Date.Past())
                    .RuleFor(o => o.Name, f => f.Name.FirstName())
                    .RuleFor(o => o.Email, f => f.Internet.Email())
                    .RuleFor(o => o.OfficialId, f => f.PickRandom(OfficialId))
                    .RuleFor(o => o.PhoneNumber, f => f.Person.Phone)
                    .RuleFor(o => o.ArchivedDate, f => null)
                    .RuleFor(o => o.Records, f => new Collection<Record>())
                    .RuleFor(o => o.PatientDoctors, f => new Collection<PatientDoctor>())
                    .Generate(50);

                var doctors = new Faker<Doctor>()
                    .RuleFor(o => o.Archived, f => false)
                    .RuleFor(o => o.Created, f => DateTime.Now)
                    .RuleFor(o => o.Department, f => f.PickRandom(department))
                    .RuleFor(o => o.DateOfBirth, f => f.Date.Past())
                    .RuleFor(o => o.Name, f => f.Name.FirstName())
                    .RuleFor(o => o.Specialty, f => f.PickRandom(specialty))
                    .RuleFor(o => o.University, f => f.PickRandom(university))
                    .RuleFor(o => o.Email, f => f.Internet.Email())
                    .RuleFor(o => o.ArchivedDate, f => null)
                    .RuleFor(o => o.PatientDoctors, f => new Collection<PatientDoctor>())
                    .RuleFor(o => o.OfficialId, f => f.PickRandom(OfficialId))
                    .RuleFor(o => o.PhoneNumber, f => f.Person.Phone)
                    .Generate(50);



                _context.Patients.AddRange(patients);
                _context.Doctors.AddRange(doctors);

                _context.SaveChanges();



                // List<PatientDoctor> patientDoctorList = new() { };

                // var patientsList = _context.Patients.ToList();
                // _context.Doctors.Skip(25).OfType<Doctor>().ToList().ForEach((doctor,index) =>
                // {
                //     patientDoctorList.Add(new PatientDoctor() { DoctorId = doctor.Id, PatientId =  })
                // });




            }
            catch (System.Exception error)
            {
                throw new Exception($"Something went wrong -- {error.Message}", error);
            }

        }
    }
}
