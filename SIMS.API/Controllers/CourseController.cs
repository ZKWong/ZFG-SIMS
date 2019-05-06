using System.Collections.Generic;
using System.Linq;
using SIMS.API.Data;
using SIMS.API.Models;
using Microsoft.AspNetCore.Mvc;
using OfficeOpenXml;
using System.IO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Hosting;
using System;
using System.Text;
using OfficeOpenXml.Style;
using System.Drawing;
using System.Web;
using Microsoft.AspNetCore.Authorization;

namespace CourseScheduling.API.Controllers
{
    /// <summary>
    /// courseController
    /// </summary>    
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CourseController : ControllerBase
    {  
        private readonly DataContext _context;
        /// <summary>
        /// initiate database context  
        /// </summary>
        /// <param name="context"></param>
        public CourseController(DataContext context) {  
            _context = context;  
        }
            /// <summary>
            /// get courses
            /// </summary>
            /// <param name="semesterid"></param>
            /// <returns></returns>
        [AllowAnonymous]
        [HttpGet("getAllCourse")]  
        public IEnumerable<Course> GetCoursesBySemester(int semesterid) {
            // fetch courses according to the semester 
            //var value = _context.Courses.FirstOrDefault(x => x.semesterId == semesterid);
            return _context.Courses.Where(x => x.semesterId == semesterid).ToList();

        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="courseNum"></param>
        /// <param name="section"></param>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpGet("getCourse")]
        public Course GetCoursesBycourseNum(string courseNum, int section)
        {
            return _context.Courses.Where(x => x.courseNum == courseNum).Where(y => y.section == section).OrderByDescending(s => s.semesterId).FirstOrDefault();
        }
        /// <summary>
        /// Add multiple courses and save one time
        /// </summary>
        /// <param name="semesterid">semeter id</param>
        /// <param name="cou"></param>
        /// <returns></returns>
        
        [AllowAnonymous]
        [HttpPost("addCourse/{semesterid}")]
        public ActionResult BulkCourses(int semesterid, [FromBody] List<Course> cou) {
            // set bad request if  data is not provided in body  
            if (cou == null||cou.Count == 0) {
                return BadRequest(new {
                    message = "Course is null"
                });  
            }
            List<Course> courseList = _context.Courses.Where(x => x.semesterId == semesterid).ToList();
            if (courseList != null && courseList.Count > 0)
                _context.RemoveRange(courseList);
            foreach (var i in cou) {
                i.semesterId = semesterid;
                i.uuid = 0;
                _context.Courses.Add(i);
            }
            _context.SaveChanges(); 
            return Ok(new {  
                message = "Courses are added successfully."  
            });  
        }
         /// <summary>
        /// 
        /// </summary>
        /// <param name="excelfile"></param>
        /// <param name="semesterid"></param>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpPost("inportCourseExcel/{semesterid}")]
        public IActionResult inportCourse(IFormFile excelfile,int semesterid)
        {
            try
            {
                string path = AppDomain.CurrentDomain.BaseDirectory + "\\temp";
                Console.WriteLine(path);
                if (!Directory.Exists(path))
                {
                    Directory.CreateDirectory(path);
                }
                string fileName = $"{Guid.NewGuid()}.xlsx";
                FileInfo file = new FileInfo(Path.Combine(path, fileName));
                using (FileStream fss = new FileStream(file.ToString(), FileMode.Create))
                {
                    excelfile.CopyTo(fss);
                    fss.Flush();
                }
                using (ExcelPackage package = new ExcelPackage(file))
                {
                    ExcelWorksheet worksheet = package.Workbook.Worksheets[1];
                    int rowCount = worksheet.Dimension.Rows;
                    for (int row = 2; row <= rowCount; row++)
                    {
                        if ("example".Equals(worksheet.Cells[row, 12].ToString()))
                            continue;
                        char[] weekdays = worksheet.Cells[row, 6].GetValue<string>().ToArray();
                        foreach(char c in weekdays)
                        {
                            Course cc = new Course();
                            cc.courseNum = worksheet.Cells[row, 1].GetValue<string>();
                            cc.section = worksheet.Cells[row, 2].GetValue<int>();
                            cc.courseTitle = worksheet.Cells[row, 3].GetValue<string>();
                            cc.crn = worksheet.Cells[row, 4].GetValue<string>();
                            cc.MaxStudent = worksheet.Cells[row, 5].GetValue<int>();
                            cc.weekday = covertWeekday(c);
                            cc.instructor = worksheet.Cells[row, 7].GetValue<string>();
                            String[] times = worksheet.Cells[row, 8].GetValue<string>().Split("-");
                            cc.scheduleStartTime = times[0].Trim();
                            cc.scheduleEndTime = times[1].Trim();
                            cc.room = worksheet.Cells[row, 9].GetValue<string>();
                            cc.scheduleType = "Lecture".Equals(worksheet.Cells[row, 10].GetValue<string>()) ? 0 : 1;
                            cc.notes = worksheet.Cells[row, 11].GetValue<string>();
                            cc.semesterId = semesterid;
                            _context.Courses.Add(cc);
                        }
                    }
                    _context.SaveChanges();
                    return Content("success");
                }
            }
            catch(Exception e)
            {
                return Content(e.Message);
            }
        }
        private string covertWeekday(char w)
        {
            switch(w){
                case 'M':
                    return "Monday";
                case 'T':
                    return "Tuesday";
                case 'W':
                    return "Wednesday";
                case 'R':
                    return "Thursday";
                case 'F':
                    return "Friday";
                default:
                    return "Monday";
            }
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="semesterid"></param>
        [AllowAnonymous]
        [HttpGet("getCourseExcel")]
        public IActionResult getCourseExcel(int semesterid)
        {
            Semester sem = _context.Semesters.FirstOrDefault(t => t.Id == semesterid);
            List<Course> clist = _context.Courses.Where(x => x.semesterId == semesterid).OrderBy(x => x.courseNum).ToList();
            var result = clist.GroupBy(x => new { x.courseNum, x.section, x.crn, x.instructor, x.scheduleStartTime, x.scheduleEndTime ,x.scheduleType});
            string fileName = sem.SemesterTime + ".xlsx";
            var stream = new MemoryStream();
            using (ExcelPackage package = new ExcelPackage(stream))
            {
                // add worksheet
                ExcelWorksheet worksheet = package.Workbook.Worksheets.Add("COURSE SCHEDULE");
                //head style
                worksheet.Row(1).Style.Font.Size = 12;
                worksheet.Row(1).Style.Font.Bold = true;
                worksheet.Row(1).CustomHeight = true;
                worksheet.Row(1).Style.ShrinkToFit = true;
                //add head
                worksheet.Cells[1, 1].Value = "Course Num";
                worksheet.Cells[1, 2].Value = "Section";
                worksheet.Cells[1, 3].Value = "Course Title";
                worksheet.Cells[1, 4].Value = "CRN";
                worksheet.Cells[1, 5].Value = "Max";
                worksheet.Cells[1, 6].Value = "Days";
                worksheet.Cells[1, 7].Value = "Instructor";
                worksheet.Cells[1, 8].Value = "Time";
                worksheet.Cells[1, 9].Value = "Room";
                worksheet.Cells[1, 10].Value = "Type";
                worksheet.Cells[1, 11].Value = "Notes";
                var rowNum = 2;
            foreach (var courses in result)
                {
                    Course c = courses.First();
                    worksheet.Cells["A" + rowNum].Value = c.courseNum;
                    worksheet.Cells["B" + rowNum].Value = c.section;
                    worksheet.Cells["C" + rowNum].Value = c.courseTitle;
                    worksheet.Cells["D" + rowNum].Value = c.crn;
                    worksheet.Cells["E" + rowNum].Value = c.MaxStudent;
                    worksheet.Cells["F" + rowNum].Value = contractWeek(courses.ToList());
                    worksheet.Cells["G" + rowNum].Value = c.instructor;
                    worksheet.Cells["H" + rowNum].Value = c.scheduleStartTime + "-" + c.scheduleEndTime;
                    worksheet.Cells["I" + rowNum].Value = c.room;
                    worksheet.Cells["J" + rowNum].Value = c.scheduleType == 0 ? "Lecture" : "Lab";
                    worksheet.Cells["K" + rowNum].Value = c.notes;
                    rowNum++;
                }
                package.Save();
            }
            stream.Position = 0;
            return File(stream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", fileName);
        }

        private string contractWeek(List<Course> clist)
        {
            string[] week = new string[] {"","","","",""};
            foreach(Course c in clist)
            {
                switch (c.weekday)
                {
                    case "Monday":
                        {
                            week[0] = "M";
                            break;
                        }
                    case "Tuesday":
                        {
                            week[1] = "T";
                            break;
                        }
                    case "Wednesday":
                        {
                            week[2] = "W";
                            break;
                        }
                    case "Thursday":
                        {
                            week[3] = "R";
                            break;
                        }
                    case "Friday":
                        {
                            week[4] = "F";
                            break;
                        }
                    default:
                        {
                            break;
                        }
                }
            }
            return string.Join("",week).Trim();
        }
        /// <summary>
        /// example for excel
        /// </summary>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpGet("getCourseExcelExample")]
        public IActionResult getCourseExcelExample()
        {
            string fileName = "example.xlsx";
            var stream = new MemoryStream();
            using (ExcelPackage package = new ExcelPackage(stream))
            {
                // add worksheet
                ExcelWorksheet worksheet = package.Workbook.Worksheets.Add("COURSE SCHEDULE");
                worksheet.Row(1).Style.Font.Size = 12;
                worksheet.Row(1).Style.Font.Bold = true;
                worksheet.Row(1).CustomHeight = true;
                worksheet.Row(1).Style.ShrinkToFit = true;
               //add head
               worksheet.Cells[1, 1].Value = "Course Num";
                worksheet.Cells[1, 2].Value = "Section";
                worksheet.Cells[1, 3].Value = "Course Title";
                worksheet.Cells[1, 4].Value = "CRN";
                worksheet.Cells[1, 5].Value = "Max";
                worksheet.Cells[1, 6].Value = "Days";
                worksheet.Cells[1, 7].Value = "Instructor";
                worksheet.Cells[1, 8].Value = "Time";
                worksheet.Cells[1, 9].Value = "Room";
                worksheet.Cells[1, 10].Value = "Type";
                worksheet.Cells[1, 11].Value = "Notes";
                worksheet.Cells[2, 1].Value =  101;
                worksheet.Cells[2, 2].Value =  1;
                worksheet.Cells[2, 3].Value = "Course Title";
                worksheet.Cells[2, 4].Value =  123456;
                worksheet.Cells[2, 5].Value =  120;
                worksheet.Cells[2, 6].Value = "MTWRF";
                worksheet.Cells[2, 7].Value = "Instructor";
                worksheet.Cells[2, 8].Value = "17:00-18:00";
                worksheet.Cells[2, 9].Value = "Room";
                worksheet.Cells[2, 10].Value = "Lecture";
                worksheet.Cells[2, 11].Value = "Notes";
                worksheet.Cells[2, 12].Value = "example";
                worksheet.Cells[3, 1].Value = 101;
                worksheet.Cells[3, 2].Value = 1;
                worksheet.Cells[3, 3].Value = "Course Title";
                worksheet.Cells[3, 4].Value = 123456;
                worksheet.Cells[3, 5].Value = 120;
                worksheet.Cells[3, 6].Value = "MTWRF";
                worksheet.Cells[3, 7].Value = "Instructor";
                worksheet.Cells[3, 8].Value = "18:00-19:00";
                worksheet.Cells[3, 9].Value = "Room";
                worksheet.Cells[3, 10].Value = "Lab";
                worksheet.Cells[3, 11].Value = "Notes";
                worksheet.Cells[3, 12].Value = "example";
                package.Save();
            }
            stream.Position = 0;
            return File(stream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", fileName);
        }

    }


}