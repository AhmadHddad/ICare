using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ICareAPI.Data;
using ICareAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using ICareAPI.constants;

namespace ICareAPI.Controllers
{
    [Route("api/recordTest")]
    [ApiController]
    [AllowAnonymous]
    public class TestRecordsController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly RoleManager<AppRole> _roleManager;
        private readonly UserManager<AppUser> _userManager;

        public TestRecordsController(DataContext context, RoleManager<AppRole> roleManager,
         UserManager<AppUser> userManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _context = context;

        }

        [HttpPost("MakeRoles")]

        public async Task<ActionResult<bool>> MakeRoles()
        {

            // var allRoles = _roleManager.Roles.ToList();

            // System.Console.WriteLine($"---------ALL ROLES {allRoles.Count} ----------");


            // if (allRoles.Count == 0)
            // {




            //     var roles = new List<AppRole>();

            //     foreach (var roleEnum in Enum.GetValues(typeof(RolesEnum)))
            //     {
            //         roles.Add(new AppRole { Name = roleEnum.ToString() });
            //     }




            //     roles.ForEach(async role =>
            //     {
            //         await _roleManager.CreateAsync(role);
            //     });

            // }


            var adminUser = new AppUser
            {
                UserName = "Ahmad Hddad",
                Email = "a@a.com",
                DateOfBirth = new DateTime(2011, 6, 10),
                SecurityStamp = Guid.NewGuid().ToString()

            };

            await _userManager.CreateAsync(adminUser, "123456789");
            await _userManager.AddToRoleAsync(adminUser, RolesEnum.Admin.ToString());


            return true;

        }

        // GET: api/Records1
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Record>>> GetRecords()
        {
            return await _context.Records.ToListAsync();
        }

        // GET: api/Records1/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Record>> GetRecord(int id)
        {
            var record = await _context.Records.FindAsync(id);

            if (record == null)
            {
                return NotFound();
            }

            return record;
        }

        // PUT: api/Records1/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRecord(int id, Record record)
        {
            if (id != record.Id)
            {
                return BadRequest();
            }

            _context.Entry(record).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RecordExists(id))
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

        // POST: api/Records1
        [HttpPost]
        public async Task<ActionResult<Record>> PostRecord(Record record)
        {
            _context.Records.Add(record);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRecord", new { id = record.Id }, record);
        }

        // DELETE: api/Records1/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Record>> DeleteRecord(int id)
        {
            var record = await _context.Records.FindAsync(id);
            if (record == null)
            {
                return NotFound();
            }

            _context.Records.Remove(record);
            await _context.SaveChangesAsync();

            return record;
        }

        private bool RecordExists(int id)
        {
            return _context.Records.Any(e => e.Id == id);
        }
    }
}
