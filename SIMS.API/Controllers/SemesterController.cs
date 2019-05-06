using System.Collections.Generic;
using System.Linq;
using SIMS.API.Data;
using SIMS.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace CourseScheduling.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class SemesterController : ControllerBase
    {  
        private readonly DataContext _context;  
        // initiate database context  
        public SemesterController(DataContext context) {  
            _context = context;  
        }

        //GET api/values
        /// <summary>
        /// get����
        /// </summary>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpGet("getAllSemester")]  
        public IEnumerable < Semester > GetAll() {  
            // fetch all records 
            return _context.Semesters.ToList();  
        }  

        /// <summary>
        /// add semester
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpPost("addSemester")]  
        public IActionResult Create([FromBody] SemesterInput item) {  
            // set bad request if semester data is not provided in body  
            if (item == null) {
                return BadRequest(new {
                    message = "Semester is null"
                });  
            }  
            _context.Semesters.Add(new Semester {  
                SemesterTime = item.SemesterTime,    
                    From = item.From,  
                    To = item.To 
            });  
            _context.SaveChanges();  
            return Ok(new {  
                message = "Semester is added successfully."  
            });  
        }  

        /// <summary>
        /// update semester by id
        /// </summary>
        /// <param name="id"></param>
        /// <param name="item"></param>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpPut("updateSemester/{id}")]  
        public IActionResult Update(int id, [FromBody] Semester item) {  
            // set bad request if semester data is not provided in body  
            if (item == null || id == 0) {  
                return BadRequest();  
            }  
            var contact = _context.Semesters.FirstOrDefault(t => t.Id == id);  
            if (contact == null) {  
                return NotFound();  
            }  
            contact.SemesterTime = item.SemesterTime;   
            contact.From = item.From;  
            contact.To = item.To;    
            _context.Semesters.Update(contact);  
            _context.SaveChanges();  
            return Ok(new {  
                message = "Semester is updated successfully."  
            });  
        }  


        [AllowAnonymous]
        [HttpDelete("deleteSemester/{id}")]  
        public IActionResult Delete(int id) {  
        var contact = _context.Semesters.FirstOrDefault(t => t.Id == id);  
        if (contact == null) {  
            return NotFound();  
        }  
        _context.Semesters.Remove(contact);  
        _context.SaveChanges();  
        return Ok(new {  
            message = "Semester is deleted successfully."  
        });  
    }  
}  
}   