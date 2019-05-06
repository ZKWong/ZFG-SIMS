using System.Data.Odbc;
using System;
using SIMS.API.Helpers;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Microsoft.Extensions.Configuration;
using SIMS.API.Dtos;
using System.IO;
using SIMS.API.Properties;

namespace SIMS.API.Controllers 
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CourseSchedulesController : ControllerBase
    {
         private readonly IConfiguration _configuration;

        public CourseSchedulesController(IConfiguration Configuration)
        {
            _configuration = Configuration;
        }

        [AllowAnonymous]
        [HttpPost("UpdateCourseSchedule")]
        public async Task<IActionResult> UpdateCourseSchedule([FromBody] dynamic dayHourly) {
            string connstr = _configuration.GetConnectionString("ODBC_DSN");
            OdbcConnection cnn;
            OdbcCommand    cmd1;
            string sxql = "";
            cnn = new OdbcConnection(connstr);
            cmd1=new OdbcCommand(sxql, cnn);
            OdbcDataReader reader1;
            int hDay=0;
            int hHour=0;
            int hSlot=0;
            string kourse_yr = "";
            string kourse_sem = "";
            string sday = "";
            string shour = "";
            string scourse_id = "";
            int[,,] dayHourlyArray = new int[8,2400,32];

            foreach( JObject objHour in dayHourly) {
                foreach(JProperty fld in objHour.Properties()) {
                    if ( fld.Name == "course_year" ) {
                        kourse_yr = (string)fld.Value;
                    } else if (fld.Name == "course_semester") {
                        kourse_sem = (string)fld.Value;
                    }
                }
            }

            if ( kourse_yr == "" || kourse_sem == "") { return BadRequest("course_year or course_semester can not be blank");}
            InsertDayHourlyRecord(cnn, kourse_yr, kourse_sem);
            GetDayHourlyArray(kourse_yr, kourse_sem, dayHourlyArray);

            foreach( JObject objHour in dayHourly) {
                sday = "";
                foreach(JProperty fld in objHour.Properties()) {
                    if(fld.Name=="day") {
                        sday = (string)fld.Value;
                    } else if (IsHourly(fld.Name.ToString()) == 1) {
                        shour = fld.Name;
                        hSlot = 1;
                        if ( sday == "" ) {
                            foreach(JProperty fld2 in objHour.Properties()) {
                                if(fld2.Name=="day") {
                                    sday = (string)fld2.Value;
                                }
                            }
                        }
                        hDay = Convert.ToInt32(sday);
                        hHour = Convert.ToInt32(shour);
                        foreach(JObject hourcourse in fld.Value) {
                            scourse_id = "";
                            foreach(JProperty course_detail in hourcourse.Properties()) {
                                if (course_detail.Name == "course_id") {
                                     scourse_id = (string)course_detail.Value;
                                     if ( scourse_id == "" ) { scourse_id = "0"; }
                                     break;
                                }
                            }
                             if (dayHourlyArray[hDay,hHour,hSlot] != Convert.ToInt32(scourse_id)) {
                                Console.WriteLine("sday: " + sday + " shour: " + shour + " slot: "+hSlot+" scourse_id: " + scourse_id+" dayArray: "+dayHourlyArray[hDay,hHour,hSlot]);
                                UpdateHourSlot(cnn,sday,shour,kourse_yr,kourse_sem,hSlot++,scourse_id);
                            } else {
                                hSlot++;
                            }
                        }
                    }
                }
            }

            return Ok("[]");
        }

        [AllowAnonymous]
        [HttpGet("Getcoursesoffer")]
        public async Task<IActionResult> Getcoursesoffer([FromQuery]CourseOfferParams courseParams) {
            if ( courseParams.kourse_yr == null || courseParams.kourse_sem == null ) { return Ok("[]");}
            Console.WriteLine("kourse_yr: " + courseParams.kourse_yr + " kourse_sem: " + courseParams.kourse_sem);

            string connstr = _configuration.GetConnectionString("ODBC_DSN");
            OdbcConnection cnn;
            OdbcCommand    cmd1;
            string sxql = "select co.prof_id,co.course,co.course_year,co.course_semester,(u.last_name) as prof_name,(co.id) as course_id,c.course_name " +
                          "from courses_offer co " + 
                          "left join faculty u on u.id=co.prof_id " +
                          "left join kourses c on c.course=co.course " +
                          "where co.course_year='" + courseParams.kourse_yr + "' and " +
                          " co.course_semester='" + courseParams.kourse_sem + "' " +
                          "order by u.last_name,co.course";
            Console.WriteLine("courses_offer_xql: "+sxql);
            cnn = new OdbcConnection(connstr);
            cmd1=new OdbcCommand(sxql, cnn);
            OdbcDataReader reader1;
            int hCount=0;
            string prof_id;
            string course_id;
            string prof_name;
            string course_name;
            string course;
            string prev_prof_id = "";
            string course_year = "";
            string course_semester = "";

            String sb="[ {\"prof_name\":\"Choose One\",\"" +
                           "prof_id\":\"\",\"" +
                           "course_year\":\"\",\"course_semester\":\"\",\"" +
                           "courses\":[";

            try {
                cnn.Open();
                reader1=cmd1.ExecuteReader();
                while ( reader1.Read() ) {
                    hCount++;
                    prof_id = reader1["prof_id"].ToString();
                    course = reader1["course"].ToString();
                    course_year = reader1["course_year"].ToString();
                    course_semester = reader1["course_semester"].ToString();
                    prof_name = reader1["prof_name"].ToString();
                    course_id = reader1["course_id"].ToString();
                    course_name = reader1["course_name"].ToString();
                    if (prev_prof_id == prof_id) {
                        sb = sb +  ",{\"course_name\":\"" + course_name + 
                                    "\",\"course\":\"" + course + 
                                    "\",\"course_id\":\"" + course_id + "\"}";
                    } else {
                        prev_prof_id = prof_id;
                        sb = sb + "]},{\"prof_name\":\"" + prof_name + "\",\"prof_id\":\"" + prof_id + "\"," +
                                   "\"course_year\":\"" + course_year + 
                                   "\",\"course_semester\":\"" + course_semester + "\"," +
                                   "\"courses\":[" +
                                    "{\"course_name\":\"" + course_name + 
                                    "\",\"course\":\"" + course + 
                                    "\",\"course_id\":\"" + course_id + "\"}";
                    }
                }
                cnn.Close();
                // Console.WriteLine(sb);
            } catch ( Exception e) {
                Console.WriteLine(e);
            }
            sb = sb + "]}]";
            return Ok(sb);
        }

        [AllowAnonymous]
        [HttpGet("GetDayHourly")]
        public async Task<IActionResult> GetDayHourly([FromQuery]CourseOfferParams dayHourlyParams) {
            if ( dayHourlyParams.kourse_yr == null || dayHourlyParams.kourse_sem == null ) { return Ok("[]");}
            Console.WriteLine("kourse_yr: " + dayHourlyParams.kourse_yr + " kourse_sem: " + dayHourlyParams.kourse_sem);

            string connstr = _configuration.GetConnectionString("ODBC_DSN");
            OdbcConnection cnn;
            OdbcCommand cmd1;
            string sxql = "select * " +
                          "from day_hourly " +
                          "where course_year='" + dayHourlyParams.kourse_yr + "' and " +
                          " course_semester='" + dayHourlyParams.kourse_sem + "' " +
                          "order by hday,htime";
            string sxql2 = "";
            cnn = new OdbcConnection(connstr);
            InsertDayHourlyRecord(cnn, dayHourlyParams.kourse_yr, dayHourlyParams.kourse_sem);
            cmd1=new OdbcCommand(sxql, cnn);
            OdbcDataReader reader1;
            string sday = "";
            string shour = "";
            string course_id = "";
            string sday_prev="";
            string shour_prev="";

            String sb="[ ";
            try {
                cnn.Open();
                reader1=cmd1.ExecuteReader();
                while ( reader1.Read() ) {
                    sday = reader1["hday"].ToString();
                    shour= reader1["htime"].ToString();
                    for (int i=1;i<17;i++) {
                        course_id = reader1["course_id_" + i].ToString();
                        sb = sb + RetrieveHourlySchedule(cnn, sday, sday_prev,shour,shour_prev, course_id );
                        sday_prev=sday;
                        shour_prev=shour;
                        // if ( i==6 && course_id=="0" ) { break; }
                        if ( i==6 ) { break; }
                    }

                }
                cnn.Close();
            } catch ( Exception e) {
                Console.WriteLine(e);
            }
            sb = sb + "]},\n" +
                 "{\"course_year\":\"" + dayHourlyParams.kourse_yr + "\"," +
                 "\"course_semester\":\"" + dayHourlyParams.kourse_sem   + "\"}]";
            return Ok(sb);    
        }

        [AllowAnonymous]
        [HttpGet("GetCourseSchedules")]
        public async Task<IActionResult> GetCourseSchedules()
        {
            string connstr = _configuration.GetConnectionString("ODBC_DSN");
            OdbcConnection cnn;
            OdbcCommand cmd1;
            string sxql = "select username,gender,knownas from aspnetusers";
            cnn = new OdbcConnection(connstr);
            cmd1=new OdbcCommand(sxql, cnn);
            OdbcDataReader reader1;
            int hCount=0;
            String sb="";

            try {
                cnn.Open();
                reader1=cmd1.ExecuteReader();
                sb = "{\"users\":[";
                while ( reader1.Read() ) {
                    if (hCount > 0) {
                        sb = sb + ",{";
                    } else {
                        sb = sb + "{";
                    }
                    hCount++;
                    // Console.WriteLine( reader1["username"] );
                    for ( int i=0; i<reader1.FieldCount; i++) {
                        sb = sb + "\"" + reader1.GetName(i) + "\":\"" + reader1[i] + "\",";
                    }
                    if (reader1.FieldCount>0) { sb = sb.Substring(0, sb.Length-1);}
                    sb=sb + "}";
                }
                sb = sb + "]}";
                cnn.Close();
                Console.WriteLine(sb);
            } catch ( Exception e) {
                Console.WriteLine(e);
            }

            return Ok(sb);
        }

        [AllowAnonymous]
        [HttpGet("GetCoursesInfos")]
        public async Task<IActionResult> GetCoursesInfos() {

            string connstr = _configuration.GetConnectionString("ODBC_DSN");
            OdbcConnection cnn;
            OdbcCommand    cmd1;
            string sxql = "select id, course, course_name, appr, credit, crn, long_title, max_students, sect, subj " +
                          "from kourses " +
                          "order by course,course_name";
            cnn = new OdbcConnection(connstr);
            cmd1=new OdbcCommand(sxql, cnn);
            OdbcDataReader reader1;
            int hRow=0;
            coursesFields c = new coursesFields();

            String sb="[";

            try {
                cnn.Open();
                reader1=cmd1.ExecuteReader();
                while ( reader1.Read() ) {
                    hRow++;
                    c.Id          = reader1["Id"].ToString();
                    c.course      = reader1["course"].ToString();
                    c.course_name = reader1["course_name"].ToString();
                    c.appr        = reader1["appr"].ToString();
                    c.credit      = reader1["credit"].ToString();
                    c.crn         = reader1["crn"].ToString();
                    c.long_title  = reader1["long_title"].ToString();
                    c.max_students= reader1["max_students"].ToString();
                    c.sect        = reader1["sect"].ToString();
                    c.subj        = reader1["subj"].ToString();
                    if (hRow > 1) {
                        sb = sb +  ",{\"row\":\"" + hRow + "\"," +
                                    "\"Id\":\"" + c.Id + "\"," +
                                     "\"course\":\"" + c.course + "\"," +
                                     "\"course_name\":\"" + c.course_name + "\"," +
                                     "\"appr\":\"" + c.appr + "\"," +
                                     "\"credit\":\"" + c.credit + "\"," +
                                     "\"crn\":\"" + c.crn + "\"," +
                                     "\"long_title\":\"" + c.long_title + "\"," +
                                     "\"max_students\":\"" + c.max_students + "\"," +
                                     "\"sect\":\"" + c.sect + "\"," +
                                     "\"subj\":\"" + c.subj + "\"}";
                    } else {
                        sb = sb + "{\"row\":\"" + hRow + "\"," +
                                    "\"Id\":\"" + c.Id + "\"," +
                                     "\"course\":\"" + c.course + "\"," +
                                     "\"course_name\":\"" + c.course_name + "\"," +
                                     "\"appr\":\"" + c.appr + "\"," +
                                     "\"credit\":\"" + c.credit + "\"," +
                                     "\"crn\":\"" + c.crn + "\"," +
                                     "\"long_title\":\"" + c.long_title + "\"," +
                                     "\"max_students\":\"" + c.max_students + "\"," +
                                     "\"sect\":\"" + c.sect + "\"," +
                                     "\"subj\":\"" + c.subj + "\"}";
                    }
                }
                cnn.Close();
            } catch ( Exception e) {
                Console.WriteLine(e);
            }
            sb = sb + "]";
            return Ok(sb);
        }

        [AllowAnonymous]
        [HttpGet("GetKoursesOfferInfos")]
        public async Task<IActionResult> GetKoursesOfferInfos() {
            string connstr = _configuration.GetConnectionString("ODBC_DSN");
            OdbcConnection cnn;
            OdbcCommand    cmd1;
            string sxql = "select co.id, co.prof_id, co.course, co.course_year, co.course_semester, (u.last_name) as prof_name, c.course_name " +
                          "from courses_offer co " +
                          "left join faculty u on u.id=co.prof_id " +
                          "left join kourses c on c.course=co.course " +
                          "order by u.last_name, co.course";
            cnn = new OdbcConnection(connstr);
            cmd1=new OdbcCommand(sxql, cnn);
            OdbcDataReader reader1;
            int hRow=0;
            string Id;
            string course_name;
            string course;
            string prof_id;
            string prof_name;
            string course_year;
            string course_semester;

            String sb="[";

            try {
                cnn.Open();
                reader1=cmd1.ExecuteReader();
                while ( reader1.Read() ) {
                    hRow++;
                    Id = reader1["Id"].ToString();
                    prof_id = reader1["prof_id"].ToString();
                    course = reader1["course"].ToString();
                    course_year = reader1["course_year"].ToString();
                    course_semester = reader1["course_semester"].ToString();
                    prof_name = reader1["prof_name"].ToString();
                    course_name = reader1["course_name"].ToString();
                    if (hRow > 1) {
                        sb = sb +  ",{\"row\":\"" + hRow + "\"," +
                                    "\"Id\":\"" + Id + "\"," +
                                    "\"prof_id\":\"" + prof_id + "\"," +
                                    "\"prof_name\":\"" + prof_name + "\"," +
                                    "\"course\":\"" + course + "\"," +
                                    "\"course_name\":\"" + course_name + "\"," +
                                    "\"course_year\":\"" + course_year + "\"," + 
                                    "\"course_semester\":\"" + course_semester + "\"}";
                    } else {
                        sb = sb + "{\"row\":\"" + hRow + "\"," +
                                   "\"Id\":\"" + Id + "\"," +
                                    "\"prof_id\":\"" + prof_id + "\"," +
                                    "\"prof_name\":\"" + prof_name + "\"," +
                                    "\"course\":\"" + course + "\"," +
                                    "\"course_name\":\"" + course_name + "\"," +
                                    "\"course_year\":\"" + course_year + "\"," + 
                                    "\"course_semester\":\"" + course_semester + "\"}";
                    }
                }
                cnn.Close();
            } catch ( Exception e) {
                Console.WriteLine(e);
            }
            sb = sb + "]";
            return Ok(sb);
        }

        [AllowAnonymous]
        [HttpGet("GetProfessors")]
        public async Task<IActionResult> GetProfessors() {
            string connstr = _configuration.GetConnectionString("ODBC_DSN");
            OdbcConnection cnn;
            OdbcCommand cmd1;
            // string sxql = "select u.id as prof_id, u.username as prof_name " +
            //               "from aspnetusers u " +
            //               "left join aspnetuserroles r on r.userid=u.id " +
            //               "where r.roleid in (3,4) " +
            //               "order by u.username";
            string sxql = "select id as prof_id,last_name as prof_name from faculty order by last_name";
            cnn = new OdbcConnection(connstr);
            cmd1=new OdbcCommand(sxql, cnn);
            OdbcDataReader reader1;
            int hRow=0;
            string prof_id;
            string prof_name;

            String sb="[";

            try {
                cnn.Open();
                reader1=cmd1.ExecuteReader();
                while ( reader1.Read() ) {
                    hRow++;
                    prof_id = reader1["prof_id"].ToString();
                    prof_name = reader1["prof_name"].ToString();

                    if (hRow > 1) {
                        sb = sb +  ",{\"prof_id\":\"" + prof_id + "\"," +
                                    "\"prof_name\":\"" + prof_name + "\"}";
                    } else {
                        sb = sb + "{\"prof_id\":\"" + prof_id + "\"," +
                                  "\"prof_name\":\"" + prof_name + "\"}";
                    }
                }
                cnn.Close();
            } catch ( Exception e) {
                Console.WriteLine(e);
            }
            sb = sb + "]";
            return Ok(sb);
        }

         [AllowAnonymous]
        [HttpGet("GetSemesters")]
        public async Task<IActionResult> GetSemesters() {

            string connstr = _configuration.GetConnectionString("ODBC_DSN");
            OdbcConnection cnn;
            OdbcCommand    cmd1;
            string sxql = "select Id,SemesterTime,[From],[To] " +
                          "from semesters " +
                          "order by Id";
            cnn = new OdbcConnection(connstr);
            cmd1=new OdbcCommand(sxql, cnn);
            OdbcDataReader reader1;
            int hRow=0;
            semestersFields c = new semestersFields();

            String sb="[";

            try {
                cnn.Open();
                reader1=cmd1.ExecuteReader();
                while ( reader1.Read() ) {
                    hRow++;
                    c.Id           = reader1["Id"].ToString();
                    c.SemesterTime = reader1["SemesterTime"].ToString();
                    c.From         = reader1["From"].ToString();
                    c.To           = reader1["To"].ToString();
                    if (hRow > 1) {
                        sb = sb +  ",{\"row\":\"" + hRow + "\"," +
                                    "\"Id\":\"" + c.Id + "\"," +
                                     "\"SemesterTime\":\"" + c.SemesterTime + "\"," +
                                     "\"From\":\"" + c.From + "\"," +
                                     "\"To\":\"" + c.To + "\"}";
                    } else {
                        sb = sb + "{\"row\":\"" + hRow + "\"," +
                                    "\"Id\":\"" + c.Id + "\"," +
                                     "\"SemesterTime\":\"" + c.SemesterTime + "\"," +
                                     "\"From\":\"" + c.From + "\"," +
                                     "\"To\":\"" + c.To + "\"}";
                    }
                }
                cnn.Close();
            } catch ( Exception e) {
                Console.WriteLine(e);
            }
            sb = sb + "]";
            return Ok(sb);
        }
        [AllowAnonymous]
        [HttpPost("Courses_Add")]
        public async Task<IActionResult> Courses_Add([FromBody]CoursesParams c) {
            string connstr = _configuration.GetConnectionString("ODBC_DSN");
            OdbcConnection cnn;
            OdbcCommand cmd1;
            string sxql = "select count(*) as hnumrec " +
                          "from kourses " +
                          "where course='" + c.course + "'";
            cnn = new OdbcConnection(connstr);
            cmd1=new OdbcCommand(sxql, cnn);
            OdbcDataReader reader1;
            string sNumrec = "";
            String sb="";

            try {
                cnn.Open();
                reader1=cmd1.ExecuteReader();
                while ( reader1.Read() ) {
                    sNumrec = reader1["hnumrec"].ToString();
                    break;
                }
                reader1.Close();
                if ( sNumrec == "0") {
                    sxql =  "insert into kourses (course,course_name,appr,credit,crn,long_title," +
                                                "max_students,sect,subj) values " +
                           "('"+c.course+"','"+c.course_name+"','"+c.appr+"','"+c.credit+"','"+c.crn+"'," +
                            "'"+c.long_title+"',"+c.max_students+",'"+c.sect+"','"+c.subj+"')";
                    cmd1.CommandText = sxql;
                    cmd1.ExecuteNonQuery();
                    sb = "{\"msg\":\"Added course " + c.course +"\"}" ;
                } else {
                    sb = "{\"msg\":\"course " + c.course + " exist, ADD aborted\"}";
                }
                cnn.Close();
            } catch ( Exception e) {
                Console.WriteLine(e);
                sb = "{\"msg\":\"" + e.ToString() + "\"}";
            }
            return Ok(sb);
        }

        [AllowAnonymous]
        [HttpPost("Courses_Update")]
        public async Task<IActionResult> Courses_Update([FromBody]CoursesParams c) {
            string connstr = _configuration.GetConnectionString("ODBC_DSN");
            OdbcConnection cnn;
            OdbcCommand    cmd1;
            string sxql = "select count(*) as hnumrec " +
                          "from kourses " +
                          "where course='" + c.course + "'";
            cnn = new OdbcConnection(connstr);
            cmd1=new OdbcCommand(sxql, cnn);
            OdbcDataReader reader1;
            string sNumrec = "";
            String sb="";

            try {
                cnn.Open();
                reader1=cmd1.ExecuteReader();
                while ( reader1.Read() ) {
                    sNumrec = reader1["hnumrec"].ToString();
                    break;
                }
                reader1.Close();
                if ( sNumrec == "1") {
                   sxql = "update kourses set course_name='"+c.course_name+"',appr='"+c.appr+"',"+
                           " credit='"+c.credit+"',crn='"+c.crn+"',long_title='"+c.long_title+"'," +
                           " max_students="+c.max_students+",sect='"+c.sect+"',subj='"+c.subj+"' " +
                           "where course='"+c.course+"'";
                    cmd1.CommandText = sxql;
                    cmd1.ExecuteNonQuery();
                    sb = "{\"msg\":\"Updated course " + c.course +"\"}" ;
                } else {
                    sb = "{\"msg\":\"course " + c.course + " does not exist, UPDATE aborted\"}";
                }
                cnn.Close();
            } catch ( Exception e) {
                Console.WriteLine(e);
                sb = "{\"msg\":\"" + e.ToString() + "\"}";
            }
            return Ok(sb);
        }

        [AllowAnonymous]
        [HttpPost("Courses_Delete")]
        public async Task<IActionResult> Courses_Delete([FromBody]CoursesParams rowClicked) {
            string connstr = _configuration.GetConnectionString("ODBC_DSN");
            OdbcConnection cnn;
            OdbcCommand    cmd1;
            string sxql = "select count(*) as hnumrec " +
                          "from kourses " +
                          "where course='" + rowClicked.course + "'";
            cnn = new OdbcConnection(connstr);
            cmd1=new OdbcCommand(sxql, cnn);
            OdbcDataReader reader1;
            string sNumrec = "";
            String sb="";

            try {
                cnn.Open();
                reader1=cmd1.ExecuteReader();
                while ( reader1.Read() ) {
                    sNumrec = reader1["hnumrec"].ToString();
                    break;
                }
                reader1.Close();
                if ( sNumrec == "1" ) {  // check if record exist in courses offer
                    sxql="select count(*) as hnumrec from courses_offer " +
                         "where course='" + rowClicked.course + "'";
                    cmd1.CommandText = sxql;
                    reader1=cmd1.ExecuteReader();
                    while ( reader1.Read() ) {
                        sNumrec = reader1["hnumrec"].ToString();
                        break;
                    }
                    reader1.Close();
                    if ( sNumrec != "0") {
                        cnn.Close();
                        sb = "{\"msg\":\"record exist in course offer, DELETE aborted\"}" ;
                        return Ok(sb);
                    }
                    sNumrec = "1";
                }
                if ( sNumrec == "1") {
                    sxql =  "delete from kourses where course='" + rowClicked.course + "'";
                    cmd1.CommandText = sxql;
                    cmd1.ExecuteNonQuery();
                    sb = "{\"msg\":\"Deleted course " + rowClicked.course +"\"}" ;
                } else {
                    sb = "{\"msg\":\"course " + rowClicked.course + " does not exist, DELETE aborted\"}";
                }
                cnn.Close();
            } catch ( Exception e) {
                Console.WriteLine(e);
                sb = "{\"msg\":\"" + e.ToString() + "\"}";
            }
            return Ok(sb);
        }

        [AllowAnonymous]
        [HttpPost("Courses_Offer_Add")]
        public async Task<IActionResult> Courses_Offer_Add([FromBody]CourseOfferParams rowClicked) {
            string connstr = _configuration.GetConnectionString("ODBC_DSN");
            OdbcConnection cnn;
            OdbcCommand    cmd1;
            string sxql = "select count(*) as hnumrec " +
                          "from courses_offer " +
                          "where course='" + rowClicked.course + "' and " +
                                "prof_id='" + rowClicked.prof_id + "' and " +
                                "course_year='" + rowClicked.course_year + "' and " +
                                "course_semester='" + rowClicked.course_semester + "'" ;
            cnn = new OdbcConnection(connstr);
            cmd1=new OdbcCommand(sxql, cnn);
            OdbcDataReader reader1;
            string sNumrec = "";
            String sb="";

            try {
                cnn.Open();
                reader1=cmd1.ExecuteReader();
                while ( reader1.Read() ) {
                    sNumrec = reader1["hnumrec"].ToString();
                    break;
                }
                reader1.Close();
                if ( sNumrec == "0") {  // ok to add record into courses_offer table
                    sxql =  "insert into courses_offer (prof_id,course,course_year,course_semester) values " +
                            "(" + rowClicked.prof_id + ",'" + rowClicked.course + "','" +
                            rowClicked.course_year + "','" + rowClicked.course_semester + "')";
                    cmd1.CommandText = sxql;
                    cmd1.ExecuteNonQuery();
                    sb = "{\"msg\":\"New record added successfully\"}" ;
                } else {
                    sb = "{\"msg\":\"record exist, ADD aborted\"}";
                }
                cnn.Close();
            } catch ( Exception e) {
                Console.WriteLine(e);
                sb = "{\"msg\":\"" + e.ToString() + "\"}";
            }
            return Ok(sb);
        }

        [AllowAnonymous]
        [HttpPost("Courses_Offer_Update")]
        public async Task<IActionResult> Courses_Offer_Update([FromBody]CourseOfferParams rowClicked) {
            string connstr = _configuration.GetConnectionString("ODBC_DSN");
            OdbcConnection cnn;
            OdbcCommand    cmd1;
            string sxql = "select count(*) as hnumrec " +
                          "from courses_offer " +
                          "where Id='" + rowClicked.Id + "'";
            cnn = new OdbcConnection(connstr);
            cmd1=new OdbcCommand(sxql, cnn);
            OdbcDataReader reader1;
            string sNumrec = "";
            String sb="";
            string kourse_id="";

            try {
                cnn.Open();
                reader1=cmd1.ExecuteReader();
                while ( reader1.Read() ) {
                    sNumrec = reader1["hnumrec"].ToString();
                    break;
                }
                reader1.Close();
                if ( sNumrec == "1" ) {  // check if record exist in day_hourly table
                    sxql="select count(*) as hnumrec from day_hourly " +
                         "where (course_id_1=" + rowClicked.Id + ") or (course_id_2=" + rowClicked.Id + ") or" + 
                                "(course_id_3=" + rowClicked.Id + ") or (course_id_4=" + rowClicked.Id + ") or" + 
                                "(course_id_5=" + rowClicked.Id + ") or (course_id_6=" + rowClicked.Id + ") or" + 
                                "(course_id_7=" + rowClicked.Id + ") or (course_id_8=" + rowClicked.Id + ") or" + 
                                "(course_id_9=" + rowClicked.Id + ") or (course_id_10=" + rowClicked.Id + ") or" + 
                                "(course_id_11=" + rowClicked.Id + ") or (course_id_12=" + rowClicked.Id + ") or" + 
                                "(course_id_13=" + rowClicked.Id + ") or (course_id_14=" + rowClicked.Id + ") or" + 
                                "(course_id_15=" + rowClicked.Id + ") or (course_id_16=" + rowClicked.Id + ")";
                    cmd1.CommandText = sxql;
                    reader1=cmd1.ExecuteReader();
                    while ( reader1.Read() ) {
                        sNumrec = reader1["hnumrec"].ToString();
                        break;
                    }
                    reader1.Close();
                    if ( sNumrec != "0") {
                        cnn.Close();
                        sb = "{\"msg\":\"record exist in course schedule, update dis-allowed\"}" ;
                        return Ok(sb);
                    }
                    sNumrec = "1";
                }
                if ( sNumrec == "1" ) {  // check if duplicate record in courses_offer table
                    sxql="select Id from courses_offer " +
                         "where prof_id='" + rowClicked.prof_id + "' and " +
                         "course='" + rowClicked.course + "' and " +
                         "course_year= '" + rowClicked.course_year + "' and " +
                         "course_semester= '" + rowClicked.course_semester + "'";
                    cmd1.CommandText = sxql;
                    reader1=cmd1.ExecuteReader();
                    while ( reader1.Read() ) {
                        kourse_id = reader1["Id"].ToString();
                        break;
                    }
                    reader1.Close();
                    if ( kourse_id != "") {
                        cnn.Close();
                        if ( kourse_id != rowClicked.Id ) {
                            sb = "{\"msg\":\"record exist in courses offer, update dis-allowed\"}" ;
                        } else {
                            sb = "{\"msg\":\"record exist with same values, update skipped\"}" ;
                        }
                        return Ok(sb);
                    }
                }
                if ( sNumrec == "1") {  // Ok to proceed to update this record from courses_offer table
                    sxql =  "update courses_offer set prof_id='" + rowClicked.prof_id + "', " +
                                                     "course='" + rowClicked.course + "', " +
                                                     "course_year= '" + rowClicked.course_year + "', " +
                                                     "course_semester= '" + rowClicked.course_semester + "' " +
                            "where Id='" + rowClicked.Id + "'";
                    cmd1.CommandText = sxql;
                    cmd1.ExecuteNonQuery();
                    sb = "{\"msg\":\"record updated successfully\"}" ;
                } else {
                    sb = "{\"msg\":\"record does not exist, UPDATE aborted\"}";
                }
                cnn.Close();
            } catch ( Exception e) {
                Console.WriteLine(e);
                sb = "{\"msg\":\"" + e.ToString() + "\"}";
            }
            return Ok(sb);
        }

        [AllowAnonymous]
        [HttpPost("Courses_Offer_Delete")]
        public async Task<IActionResult> Courses_Offer_Delete([FromBody]CourseOfferParams rowClicked) {
            string connstr = _configuration.GetConnectionString("ODBC_DSN");
            OdbcConnection cnn;
            OdbcCommand    cmd1;
            string sxql = "select count(*) as hnumrec " +
                          "from courses_offer " +
                          "where Id='" + rowClicked.Id + "'";
            cnn = new OdbcConnection(connstr);
            cmd1=new OdbcCommand(sxql, cnn);
            OdbcDataReader reader1;
            string sNumrec = "";
            String sb="";

            try {
                cnn.Open();
                reader1=cmd1.ExecuteReader();
                while ( reader1.Read() ) {
                    sNumrec = reader1["hnumrec"].ToString();
                    break;
                }
                reader1.Close();
                if ( sNumrec == "1" ) {  // check if record exist in day_hourly table
                    sxql="select count(*) as hnumrec from day_hourly " +
                         "where (course_id_1=" + rowClicked.Id + ") or (course_id_2=" + rowClicked.Id + ") or" + 
                                "(course_id_3=" + rowClicked.Id + ") or (course_id_4=" + rowClicked.Id + ") or" + 
                                "(course_id_5=" + rowClicked.Id + ") or (course_id_6=" + rowClicked.Id + ") or" + 
                                "(course_id_7=" + rowClicked.Id + ") or (course_id_8=" + rowClicked.Id + ") or" + 
                                "(course_id_9=" + rowClicked.Id + ") or (course_id_10=" + rowClicked.Id + ") or" + 
                                "(course_id_11=" + rowClicked.Id + ") or (course_id_12=" + rowClicked.Id + ") or" + 
                                "(course_id_13=" + rowClicked.Id + ") or (course_id_14=" + rowClicked.Id + ") or" + 
                                "(course_id_15=" + rowClicked.Id + ") or (course_id_16=" + rowClicked.Id + ")";
                    cmd1.CommandText = sxql;
                    reader1=cmd1.ExecuteReader();
                    while ( reader1.Read() ) {
                        sNumrec = reader1["hnumrec"].ToString();
                        break;
                    }
                    reader1.Close();
                    if ( sNumrec != "0") {
                        cnn.Close();
                        sb = "{\"msg\":\"record exist in course schedule, delete dis-allowed\"}" ;
                        return Ok(sb);
                    }
                    sNumrec = "1";
                }
                if ( sNumrec == "1") {   // ok to proceed to delete record from courses_offer table
                    sxql =  "delete from courses_offer where Id='" + rowClicked.Id + "'";
                    cmd1.CommandText = sxql;
                    cmd1.ExecuteNonQuery();
                    sb = "{\"msg\":\"record deleted successfully\"}" ;
                } else {
                    sb = "{\"msg\":\"record does not exist, DELETE aborted\"}";
                }
                cnn.Close();
            } catch ( Exception e) {
                Console.WriteLine(e);
                sb = "{\"msg\":\"" + e.ToString() + "\"}";
            }
            return Ok(sb);
        }

        [AllowAnonymous]
        [HttpPost("importcourses/{fileName}")]
        public async Task<IActionResult> importcourses(string fileName,
                                                    [FromForm]FileForCreationDto objFile)
        {
            Console.WriteLine("fileName: " + fileName);
            var file        = objFile.File;
            string wwwroot  = _configuration.GetConnectionString("wwwroot");
            if (!Directory.Exists(wwwroot)) { Directory.CreateDirectory(wwwroot); }
            string FilePath = wwwroot + @"repo\courses\";
            string FileN    = DateTime.Now.ToString("yyyyMMddHHmmss") + "_" + UniqueKey.GetUniqueKey(16)  + "_" + fileName;
            string fullFile = FilePath + @"\" + FileN;;
            importCourseStatus importcourseStatus = new importCourseStatus();

            if (file.Length > 0)
            {
                if (!Directory.Exists(FilePath)) { Directory.CreateDirectory(FilePath); }
                var sf1  = new FileStream(fullFile, FileMode.Create);
                await file.CopyToAsync(sf1);        
                sf1.Close();
                sf1.Dispose();
                importcourseStatus.status = "*";
                updateCourseTable(fullFile,importcourseStatus);

                return Ok(importcourseStatus.status);

            }
            return BadRequest("Could not import the file");
        }

        [AllowAnonymous]
        [HttpPost("importcoursesoffer/{fileName}")]
        public async Task<IActionResult> importcoursesoffer(string fileName,
                                                             [FromForm]FileForCreationDto objFile)
        {
            Console.WriteLine("fileName: " + fileName);
            var file        = objFile.File;
            string wwwroot  = _configuration.GetConnectionString("wwwroot");
            if (!Directory.Exists(wwwroot)) { Directory.CreateDirectory(wwwroot); }
            string FilePath = wwwroot + @"repo\courses\";
            string FileN    = DateTime.Now.ToString("yyyyMMddHHmmss") + "_" + UniqueKey.GetUniqueKey(16)  + "_" + fileName;
            string fullFile = FilePath + @"\" + FileN;;
            importCourseStatus importcourseStatus = new importCourseStatus();

            if (file.Length > 0)
            {
                if (!Directory.Exists(FilePath)) { Directory.CreateDirectory(FilePath); }
                var sf1  = new FileStream(fullFile, FileMode.Create);
                await file.CopyToAsync(sf1);        
                sf1.Close();
                sf1.Dispose();
                importcourseStatus.status = "*";
                updateCourseOfferTable(fullFile,importcourseStatus);

                return Ok(importcourseStatus.status);

            }
            return BadRequest("Could not import the file");
        }

        [AllowAnonymous]
        [HttpPost("importsemester/{fileName}")]
        public async Task<IActionResult> importsemester(string fileName,
                                                             [FromForm]FileForCreationDto objFile)
        {
            Console.WriteLine("fileName: " + fileName);
            var file        = objFile.File;
            string wwwroot  = _configuration.GetConnectionString("wwwroot");
            if (!Directory.Exists(wwwroot)) { Directory.CreateDirectory(wwwroot); }
            string FilePath = wwwroot + @"repo\semester\";
            string FileN    = DateTime.Now.ToString("yyyyMMddHHmmss") + "_" + UniqueKey.GetUniqueKey(16)  + "_" + fileName;
            string fullFile = FilePath + @"\" + FileN;;
            importCourseStatus importcourseStatus = new importCourseStatus();

            if (file.Length > 0)
            {
                if (!Directory.Exists(FilePath)) { Directory.CreateDirectory(FilePath); }
                var sf1  = new FileStream(fullFile, FileMode.Create);
                await file.CopyToAsync(sf1);        
                sf1.Close();
                sf1.Dispose();
                importcourseStatus.status = "*";
                updateSemester(fullFile,importcourseStatus);

                return Ok(importcourseStatus.status);

            }
            return BadRequest("Could not import the file");
        }

        [AllowAnonymous]
        [HttpPost("importcourse_schedule/{fileName}")]
        public async Task<IActionResult> importcourse_schedule(string fileName,
                                                             [FromForm]FileForCreationDto objFile)
        {
            Console.WriteLine("fileName: " + fileName);
            var file        = objFile.File;
            string wwwroot  = _configuration.GetConnectionString("wwwroot");
            if (!Directory.Exists(wwwroot)) { Directory.CreateDirectory(wwwroot); }
            string FilePath = wwwroot + @"repo\course_schedule\";
            string FileN    = DateTime.Now.ToString("yyyyMMddHHmmss") + "_" + UniqueKey.GetUniqueKey(16)  + "_" + fileName;
            string fullFile = FilePath + @"\" + FileN;;
            importCourseStatus importcourseStatus = new importCourseStatus();

            if (file.Length > 0)
            {
                if (!Directory.Exists(FilePath)) { Directory.CreateDirectory(FilePath); }
                var sf1  = new FileStream(fullFile, FileMode.Create);
                await file.CopyToAsync(sf1);        
                sf1.Close();
                sf1.Dispose();
                importcourseStatus.status = "*";
                updateCourse_Schedule(fullFile,importcourseStatus);

                return Ok(importcourseStatus.status);

            }
            return BadRequest("Could not import the file");
        }

        public int IsHourly(string hourly_string){

            try {
                switch(Convert.ToInt32(hourly_string)){
                case 700: case 800: case 900: case 1000: case 1100: case 1200: case 1300:
                    return 1;
                case 1400: case 1500: case 1600: case 1700: case 1800: case 1900: case 2000:
                    return 1;
                case 730: case 830: case 930: case 1030: case 1130: case 1230: case 1330:
                    return 1;
                case 1430: case 1530: case 1630: case 1730: case 1830: case 1930: case 2030:
                    return 1;
                default:
                    return 0;
                }
            } catch (Exception e) {
                return 0;
            }

        }

        public void InsertDayHourlyRecord(OdbcConnection cnn, string kourse_yr, string kourse_sem ){
            string sxql = "select count(*) as hnumrec from day_hourly " +
                          "where course_year='" + kourse_yr + "' and course_semester='" + kourse_sem + "'";
            string sxql2= "";
            OdbcCommand cmd1 = new OdbcCommand(sxql, cnn);
            OdbcDataReader reader1;

            try {
                cnn.Open();
                reader1 = cmd1.ExecuteReader();
                while (reader1.Read()) {
                    if ( reader1["hnumrec"].ToString() != "0" ) { 
                        cnn.Close();
                        return; 
                    }
                }
                reader1.Close();
                sxql = "";
                for (int hday=0; hday<7; hday++) {
                    for ( int i=7; i < 21; i++ ) {
                        sxql = "insert into day_hourly (hday,htime,course_year,course_semester,course_id_1," +
                               "course_id_2,course_id_3,course_id_4,course_id_5,course_id_6,course_id_7," +
                               "course_id_8,course_id_9,course_id_10,course_id_11,course_id_12,course_id_13," +
                               "course_id_14,course_id_15,course_id_16) values ";
                        switch(i)  {
                            case 7:
                                sxql2= sxql + "(" + hday + ",730,'";
                                sxql = sxql + "(" + hday + ",700,'";
                                break;
                            case 8:
                                sxql2= sxql + "(" + hday + ",830,'";
                                sxql = sxql + "(" + hday + ",800,'";
                                break;
                            case 9:
                                sxql2= sxql + "(" + hday + ",930,'";
                                sxql = sxql + "(" + hday + ",900,'";
                                break;
                            case 10:
                                sxql2= sxql + "(" + hday + ",1030,'";
                                sxql = sxql + "(" + hday + ",1000,'";
                                break;
                            case 11:
                                sxql2= sxql + "(" + hday + ",1130,'";
                                sxql = sxql + "(" + hday + ",1100,'";
                                break;
                            case 12:
                                sxql2= sxql + "(" + hday + ",1230,'";
                                sxql = sxql + "(" + hday + ",1200,'";
                                break;
                            case 13:
                                sxql2= sxql + "(" + hday + ",1330,'";
                                sxql = sxql + "(" + hday + ",1300,'";
                                break;
                            case 14:
                                sxql2= sxql + "(" + hday + ",1430,'";
                                sxql = sxql + "(" + hday + ",1400,'";
                                break;
                            case 15:
                                sxql2= sxql + "(" + hday + ",1530,'";
                                sxql = sxql + "(" + hday + ",1500,'";
                                break;
                            case 16:
                                sxql2= sxql + "(" + hday + ",1630,'";
                                sxql = sxql + "(" + hday + ",1600,'";
                                break;
                            case 17:
                                sxql2= sxql + "(" + hday + ",1730,'";
                                sxql = sxql + "(" + hday + ",1700,'";
                                break;
                            case 18:
                                sxql2= sxql + "(" + hday + ",1830,'";
                                sxql = sxql + "(" + hday + ",1800,'";
                                break;
                            case 19:
                                sxql2= sxql + "(" + hday + ",1930,'";
                                sxql = sxql + "(" + hday + ",1900,'";
                                break;
                            case 20:
                                sxql2= sxql + "(" + hday + ",2030,'";
                                sxql = sxql + "(" + hday + ",2000,'";
                                break;
                            default:
                                break;
                        }
                        sxql = sxql + kourse_yr + "','" + kourse_sem  + "',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0)";
                        cmd1.CommandText = sxql;
                        cmd1.ExecuteNonQuery();
                        sxql = sxql2 + kourse_yr + "','" + kourse_sem  + "',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0)";
                        cmd1.CommandText = sxql;
                        cmd1.ExecuteNonQuery();
                    }
                }
                cnn.Close();
            } catch  (Exception e) {
                Console.WriteLine(e);
                return;
            }
        }

        public void UpdateHourSlot(OdbcConnection cnn,string sday,string shour,string kourse_yr,string kourse_sem,int hSlot,string scourse_id) {

            string sxql = "update day_hourly set course_id_" + hSlot + "=" + scourse_id + 
                          " where hday=" + sday + " and htime=" + shour + " and course_year='"+kourse_yr +
                             "' and course_semester='"+kourse_sem+"'";
             Console.WriteLine("UpdateHourlySlot: " + sxql);
            OdbcCommand cmd1 = new OdbcCommand(sxql, cnn);
            int hOpen = 0;
            try {
                cnn.Open();
                hOpen = 1;
                cmd1.ExecuteNonQuery();
                cnn.Close();
            } catch (Exception e) {
                if ( hOpen == 1 ) {cnn.Close();}
                Console.WriteLine(e);
            }

            return;
        }

        public string RetrieveHourlySchedule(OdbcConnection cnn, string sday, string sday_prev, string shour, string shour_prev,string kourse_id) {
            string sb = "";
            string prof_id="";
            string prof_name="";
            string course_name="";
            string course="";

            if (kourse_id == "0") {
                if ((sday_prev == sday) && (shour_prev == shour)) {
                    sb = sb +  ",{\"prof_name\":\"" + prof_name + "\"," +
                                 "\"course_name\":\"" + course_name + "\"," +
                                 "\"course\":\"" + course + "\"," +
                                 "\"prof_id\":\"" + prof_id + "\"," +
                                 "\"course_id\":\"" + kourse_id + "\"}";

                } else if (sday_prev == sday) {
                    sb = sb + "],\"" + 
                        shour + "\": [{" + 
                        "\"prof_name\":\"" + prof_name + "\"," +
                        "\"course_name\":\"" + course_name + "\"," +
                        "\"course\":\"" + course + "\"," +
                        "\"prof_id\":\"" + prof_id + "\"," +
                        "\"course_id\":\"" + kourse_id + "\"}";

                } else {
                    sday_prev = sday;
                    shour_prev = shour;
                    if ( sday != "0" ) { sb = sb + "]},\n"; }
                    sb = sb + "{\"day\":\"" + sday + "\",\"" + 
                                shour + "\": [{" +
                                 "\"prof_name\":\"" + prof_name + "\"," +
                                "\"course_name\":\"" + course_name + "\"," +
                                "\"course\":\"" + course + "\"," +
                                "\"prof_id\":\"" + prof_id + "\"," + 
                                "\"course_id\":\"" + kourse_id + "\"}";
                }
                return sb;
            }

            string sxql ="select u.last_name,c.course_name,co.course,co.prof_id " +
                         "from courses_offer co " +
                         "left join faculty u on u.id=co.prof_id " +
                         "left join kourses c on c.course=co.course " +
                         "where co.id=" + kourse_id;
            OdbcCommand cmd2=new OdbcCommand(sxql, cnn);
            OdbcDataReader reader2 = cmd2.ExecuteReader();
            while (reader2.Read()) {
                prof_name = reader2["last_name"].ToString();
                course_name = reader2["course_name"].ToString();
                course = reader2["course"].ToString();
                prof_id = reader2["prof_id"].ToString();
                break;
            }

            if ((sday_prev == sday) && (shour_prev == shour)) {
                sb = sb +  ",{\"prof_name\":\"" + prof_name + "\"," +
                            "\"course_name\":\"" + course_name + "\"," +
                            "\"course\":\"" + course + "\"," +
                            "\"prof_id\":\"" + prof_id + "\"," +
                            "\"course_id\":\"" + kourse_id + "\"}";

            } else if (sday_prev == sday) {
                sb = sb + "],\"" + 
                    shour + "\": [{" + 
                    "\"prof_name\":\"" + prof_name + "\"," +
                    "\"course_name\":\"" + course_name + "\"," +
                    "\"course\":\"" + course + "\"," +
                    "\"prof_id\":\"" + prof_id + "\"," +
                    "\"course_id\":\"" + kourse_id + "\"}";

            } else {
                sday_prev = sday;
                shour_prev = shour;
                if ( sday != "0" ) { sb = sb + "]},\n"; }
                sb = sb + "{\"day\":\"" + sday + "\",\"" + 
                            shour + "\": [{" + 
                            "\"prof_name\":\"" + prof_name + "\"," +
                            "\"course_name\":\"" + course_name + "\"," +
                            "\"course\":\"" + course + "\"," +
                            "\"prof_id\":\"" + prof_id + "\"," +
                            "\"course_id\":\"" + kourse_id + "\"}";
            }

            return sb;
        }

        public int updateCourseTable(string courses_csv, importCourseStatus importcourseStatus){
            string[] csv_fields;
            coursesFieldsFromCsv cc = new coursesFieldsFromCsv();
            coursesFields c         = new coursesFields();
            int hCount               = 0;
            string sXql              = "";
            string connstr = _configuration.GetConnectionString("ODBC_DSN");
            OdbcConnection cnn;
            OdbcCommand    cmd1;
            cnn            = new OdbcConnection(connstr);
            OdbcDataReader reader1;
            int hNumrec    = 0;

            foreach (string line in System.IO.File.ReadLines(courses_csv)) {
                csv_fields = line.Split(",");

                if ( csv_fields[0] == "Subj") { continue; }
                if (csv_fields.Length < cc.hTotalNumberColumns) {
                    importcourseStatus.errorcount++;
                    Console.WriteLine("this row has less than "+cc.hTotalNumberColumns+" columns, skip this row");
                    continue;
                }

                c.course         = csv_fields[cc.hCourse];
                c.course_name    = csv_fields[cc.hCourseName];
                c.appr           = csv_fields[cc.hAppr];
                c.credit         = csv_fields[cc.hCredit];
                c.crn            = csv_fields[cc.hCRN];
                c.long_title     = csv_fields[cc.hLongTitle];
                c.max_students   = csv_fields[cc.hMaxStudends];
                c.sect           = csv_fields[cc.hSect];
                c.subj           = csv_fields[cc.hSubj];

                sXql   ="select count(*) as hnumrec from kourses where course='"+c.course+"'";
                cmd1   =new OdbcCommand(sXql, cnn);
                hNumrec=-1;

                try {
                    if (hCount==0) {cnn.Open();}
                    reader1=cmd1.ExecuteReader();
                    while ( reader1.Read() ) {
                        hNumrec = Convert.ToInt32(reader1["hnumrec"].ToString());
                        break;
                    }
                    reader1.Close();
                } catch ( Exception e) {
                    Console.WriteLine(e);
                }

                sXql      = "";
                c.Id      = "";
                if (hNumrec==0) {
                    importcourseStatus.addcount++;
                    sXql = "insert into kourses (course,course_name,appr,credit,crn,long_title," +
                                                "max_students,sect,subj) values " +
                           "('"+c.course+"','"+c.course_name+"','"+c.appr+"','"+c.credit+"','"+c.crn+"'," +
                            "'"+c.long_title+"',"+c.max_students+",'"+c.sect+"','"+c.subj+"')";
                } 
                else if (hNumrec>0) {
                    importcourseStatus.updatecount++;
                    sXql = "update kourses set course_name='"+c.course_name+"',appr='"+c.appr+"',"+
                           " credit='"+c.credit+"',crn='"+c.crn+"',long_title='"+c.long_title+"'," +
                           " max_students="+c.max_students+",sect='"+c.sect+"',subj='"+c.subj+"' " +
                           "where course='"+c.course+"'";
                } 
                else {
                    importcourseStatus.errorcount++;
                }
                hCount++;

                if(sXql!=""){
                    try {
                        cmd1.CommandText=sXql;
                        cmd1.ExecuteNonQuery();
                    } catch ( Exception e) {
                        Console.WriteLine(sXql);
                        Console.WriteLine(e);
                    }
                }

            }
            if (hCount>0) {cnn.Close();}
            Console.WriteLine("Num of Records processed: " + hCount);
            importcourseStatus.status = "Add: "+importcourseStatus.addcount+
                                  "<br/>Update: "+importcourseStatus.updatecount+
                                  "<br/>Error: "+importcourseStatus.errorcount+
                                  "<br/>Total:"+(importcourseStatus.addcount+importcourseStatus.updatecount+importcourseStatus.errorcount);
            return 1;
        }

        public int updateCourseOfferTable(string courses_csv, importCourseStatus importcourseStatus){
            string[] csv_fields;
            coursesofferFieldsFromCsv cc = new coursesofferFieldsFromCsv();
            coursesofferFields c         = new coursesofferFields();
            int hCount               = 0;
            string sXql              = "";
            string connstr = _configuration.GetConnectionString("ODBC_DSN");
            OdbcConnection cnn;
            OdbcCommand    cmd1;
            cnn            = new OdbcConnection(connstr);
            OdbcDataReader reader1;
            int hNumrec    = 0;

            foreach (string line in System.IO.File.ReadLines(courses_csv)) {
                csv_fields = line.Split(",");

                if ( csv_fields[0] == "last_name") { continue; }
                if (csv_fields.Length < cc.hTotalNumberColumns) {
                    importcourseStatus.errorcount++;
                    Console.WriteLine("this row has less than "+cc.hTotalNumberColumns+" columns, skip this row");
                    continue;
                }

                c.course         = csv_fields[cc.hCourse];
                c.prof_name      = csv_fields[cc.hProf_Name];
                c.course_year    = csv_fields[cc.hCourse_Year];
                c.course_semester= csv_fields[cc.hCourse_Semester];
                if(String.IsNullOrEmpty(c.course)==true) continue;
                if(String.IsNullOrEmpty(c.prof_name)==true) continue;
                if(String.IsNullOrEmpty(c.course_year)==true) continue;
                if(String.IsNullOrEmpty(c.course_semester)==true) continue;

                sXql     ="select id as prof_id from faculty where last_name='"+c.prof_name+"'";
                cmd1     =new OdbcCommand(sXql, cnn);
                c.prof_id="";

                try {
                    if (hCount==0) {cnn.Open();}
                    reader1=cmd1.ExecuteReader();
                    while ( reader1.Read() ) {
                        c.prof_id = reader1["prof_id"].ToString();
                        break;
                    }
                    reader1.Close();
                } catch ( Exception e) {
                    Console.WriteLine(e);
                }

                if(hCount==0) { //cleanup the courses_offer table before insert new record.
                    sXql   ="delete from courses_offer "+
                            "where course_year='"+c.course_year+"' and course_semester='"+c.course_semester+"'";
                    cmd1   =new OdbcCommand(sXql, cnn);
                    try {
                        cmd1.CommandText=sXql;
                        cmd1.ExecuteNonQuery();
                    } catch ( Exception e) {
                        Console.WriteLine(sXql);
                        Console.WriteLine(e);
                    }
                }

                sXql      = "";
                hNumrec   = (String.IsNullOrEmpty(c.prof_id)==true) ? -1 : 0;
                if (hNumrec==0) {
                    importcourseStatus.addcount++;
                    sXql = "insert into courses_offer (course,prof_id,course_year,course_semester) values " +
                             "('"+c.course+"','"+c.prof_id+"','"+c.course_year+"','"+c.course_semester+"')";
                } 
                else {
                    importcourseStatus.errorcount++;
                }
                hCount++;

                if(sXql!=""){
                    try {
                        cmd1.CommandText=sXql;
                        cmd1.ExecuteNonQuery();
                    } catch ( Exception e) {
                        Console.WriteLine(sXql);
                        Console.WriteLine(e);
                    }
                }

            }
            if (hCount>0) {cnn.Close();}
            Console.WriteLine("Num of Records processed: " + hCount);
            importcourseStatus.status = "Add: "+importcourseStatus.addcount+
                                  "<br/>Update: "+importcourseStatus.updatecount+
                                  "<br/>Error: "+importcourseStatus.errorcount+
                                  "<br/>Total:"+(importcourseStatus.addcount+importcourseStatus.updatecount+importcourseStatus.errorcount);
            return 1;
        }
        public int updateSemester(string semester_csv, importCourseStatus importcourseStatus){
            string[] csv_fields;
            semestersFieldsFromCsv cc = new semestersFieldsFromCsv();
            semestersFields c         = new semestersFields();
            int hCount               = 0;
            string sXql              = "";
            string connstr = _configuration.GetConnectionString("ODBC_DSN");
            OdbcConnection cnn;
            OdbcCommand    cmd1;
            cnn            = new OdbcConnection(connstr);
            OdbcDataReader reader1;
            int hNumrec    = 0;

            foreach (string line in System.IO.File.ReadLines(semester_csv)) {
                csv_fields = line.Split(",");

                if ( csv_fields[0] == "SemesterTime") { continue; }
                if (csv_fields.Length < cc.hTotalNumberColumns) {
                    importcourseStatus.errorcount++;
                    Console.WriteLine("this row has less than "+cc.hTotalNumberColumns+" columns, skip this row");
                    continue;
                }

                c.SemesterTime = csv_fields[cc.hSemesterTime];
                c.From         = csv_fields[cc.hFrom];
                c.To           = csv_fields[cc.hTo];

                sXql   ="select count(*) as hnumrec from semesters where SemesterTime='"+c.SemesterTime+"'";
                cmd1   =new OdbcCommand(sXql, cnn);
                hNumrec=-1;

                try {
                    if (hCount==0) {cnn.Open();}
                    reader1=cmd1.ExecuteReader();
                    while ( reader1.Read() ) {
                        hNumrec = Convert.ToInt32(reader1["hnumrec"].ToString());
                        break;
                    }
                    reader1.Close();
                } catch ( Exception e) {
                    Console.WriteLine(e);
                }

                sXql      = "";
                c.Id      = "";
                if (hNumrec==0) {
                    importcourseStatus.addcount++;
                    sXql = "insert into semesters (SemesterTime,[From],[To]) values " +
                           "('"+c.SemesterTime+"','"+c.From+"','"+c.To+"')";
                } 
                else if (hNumrec>0) {
                    importcourseStatus.updatecount++;
                    sXql = "update semesters set [From]='"+c.From+"',[To]='"+c.To+"' "+
                           "where SemesterTime='"+c.SemesterTime+"'";
                } 
                else {
                    importcourseStatus.errorcount++;
                }
                hCount++;

                if(sXql!=""){
                    try {
                        cmd1.CommandText=sXql;
                        cmd1.ExecuteNonQuery();
                    } catch ( Exception e) {
                        Console.WriteLine(sXql);
                        Console.WriteLine(e);
                    }
                }

            }
            if (hCount>0) {cnn.Close();}
            Console.WriteLine("Num of Records processed: " + hCount);
            importcourseStatus.status = "Add: "+importcourseStatus.addcount+
                                  "<br/>Update: "+importcourseStatus.updatecount+
                                  "<br/>Error: "+importcourseStatus.errorcount+
                                  "<br/>Total:"+(importcourseStatus.addcount+importcourseStatus.updatecount+importcourseStatus.errorcount);
            return 1;
        }

        public int updateCourse_Schedule(string course_csv, importCourseStatus importcourseStatus){
            string[] csv_fields;
            courseScheduleFieldsFromCsv cc = new courseScheduleFieldsFromCsv();
            courseScheduleFields c         = new courseScheduleFields();
            int hCount               = 0;
            string sXql              = "";
            string connstr = _configuration.GetConnectionString("ODBC_DSN");
            OdbcConnection cnn;
            OdbcCommand    cmd1;
            cnn            = new OdbcConnection(connstr);
            OdbcDataReader reader1;
            int hNumrec    = 0;

            foreach (string line in System.IO.File.ReadLines(course_csv)) {
                csv_fields = line.Split(",");

                if ( csv_fields[0] == "courseNum") { continue; }
                if (csv_fields.Length < cc.hTotalNumberColumns) {
                    importcourseStatus.errorcount++;
                    Console.WriteLine("this row has less than "+cc.hTotalNumberColumns+" columns, skip this row");
                    continue;
                }

                c.courseNum         = csv_fields[cc.hCourseNum];
                c.section           = csv_fields[cc.hSection];
                c.creditHours       = csv_fields[cc.hCreditHours];
                c.courseTitle       = csv_fields[cc.hCourseTitle];
                c.crn               = csv_fields[cc.hCRN];
                c.maxStudent        = csv_fields[cc.hMaxStudent];
                c.weekday           = csv_fields[cc.hWeekday];
                c.instructor        = csv_fields[cc.hInstructor];
                c.scheduleStartTime = csv_fields[cc.hScheduleStartTime];
                c.scheduleEndTime   = csv_fields[cc.hScheduleEndTime];
                c.room              = csv_fields[cc.hRoom];
                c.notes             = csv_fields[cc.hNotes];
                c.semesterTime      = csv_fields[cc.hSemesterTime];
                c.semesterId        = "";

                sXql   ="select Id from Semesters where SemesterTime='"+c.semesterTime+"'";
                cmd1   =new OdbcCommand(sXql, cnn);
                hNumrec=0;

                try {
                    if (hCount==0) {cnn.Open();}
                    reader1=cmd1.ExecuteReader();
                    while ( reader1.Read() ) {
                        c.semesterId = reader1["Id"].ToString();
                        break;
                    }
                    reader1.Close();
                } catch ( Exception e) {
                    Console.WriteLine(e);
                }
                if (c.semesterId == "") {
                    sXql="insert into Semesters (SemesterTime,[From],[To]) values "+
                         "   ('"+c.semesterTime+"','2019-01-01','2019-01-01')";
                    try {
                        cmd1.CommandText=sXql;
                        cmd1.ExecuteNonQuery();
                    } catch ( Exception e) {
                        Console.WriteLine(sXql);
                        Console.WriteLine(e);
                        return 0;
                    }
                }
                if (c.semesterId == "") {
                    sXql   ="select Id from Semesters where SemesterTime='"+c.semesterTime+"'";
                    cmd1.CommandText=sXql;

                    try {
                        reader1=cmd1.ExecuteReader();
                        while ( reader1.Read() ) {
                            c.semesterId = reader1["Id"].ToString();
                            break;
                        }
                        reader1.Close();
                    } catch ( Exception e) {
                        Console.WriteLine(e);
                    }
                }

                if (hCount == 0) { // delete all current semester schedule
                    sXql   ="delete from Courses where SemesterId='"+c.semesterId+"'";
                    try {
                        cmd1.CommandText = sXql;
                        cmd1.ExecuteNonQuery();
                    } catch ( Exception e) {
                        Console.WriteLine(e);
                    }
                }

                sXql      = "";
                if (hNumrec==0) {
                    importcourseStatus.addcount++;
                    sXql = "insert into Courses (courseNum,section,creditHours,courseTitle,crn,"+
                           "  maxStudent,weekday,instructor,scheduleStartTime,scheduleEndTime,"+
                           "  room,notes,scheduleType,semesterId) values " +
                           "('"+c.courseNum+"',"+c.section+","+c.creditHours+",'"+c.courseTitle+"',"+
                           " '"+c.crn+"',"+c.maxStudent+",'"+c.weekday+"','"+c.instructor+"',"+
                           " '"+c.scheduleStartTime+"','"+c.scheduleEndTime+"','"+c.room+"',"+
                           " '"+c.notes+"',0,"+c.semesterId+")";
                } 
                else {
                    importcourseStatus.errorcount++;
                }
                hCount++;

                if(sXql!=""){
                    try {
                        cmd1.CommandText=sXql;
                        cmd1.ExecuteNonQuery();
                        Console.WriteLine(sXql);
                    } catch ( Exception e) {
                        Console.WriteLine(sXql);
                        Console.WriteLine(e);
                    }
                }

            }
            if (hCount>0) {cnn.Close();}
            Console.WriteLine("Num of Records processed: " + hCount);
            importcourseStatus.status = "Add: "+importcourseStatus.addcount+
                                  "<br/>Update: "+importcourseStatus.updatecount+
                                  "<br/>Error: "+importcourseStatus.errorcount+
                                  "<br/>Total:"+(importcourseStatus.addcount+importcourseStatus.updatecount+importcourseStatus.errorcount);
            return 1;
        }
        public void GetDayHourlyArray(String xYear, String xSemester, int[,,] dayHourlyArray) {
            string connstr = _configuration.GetConnectionString("ODBC_DSN");
            OdbcConnection cnn;
            OdbcCommand    cmd1;
            string sxql = "select * from day_hourly where course_year='"+xYear+"' and course_semester='"+xSemester+"'";
            cnn = new OdbcConnection(connstr);
            cmd1=new OdbcCommand(sxql, cnn);
            OdbcDataReader reader1;
            int lDay = 0;
            int lHour= 0;
            int lCourseID = 0;
            try {
                cnn.Open();
                reader1=cmd1.ExecuteReader();
                while ( reader1.Read() ) {
                    lDay = Convert.ToInt32(reader1["hday"].ToString());
                    lHour= Convert.ToInt32(reader1["htime"].ToString());
                    for (int i=1;i<17;i++) {
                        lCourseID = Convert.ToInt32(reader1["course_id_" + i].ToString());
                        dayHourlyArray[lDay,lHour,i] = lCourseID ;
                    }

                }
                cnn.Close();
            } catch ( Exception e) {
                Console.WriteLine(e);
            }
            return;
        }

    }

    public class coursesFields {
        public string Id            = "";
        public string course        = "";
        public string course_name   = "";
        public string appr          = "";
        public string credit        = "";
        public string crn           = "";
        public string long_title    = "";
        public string max_students  = "";
        public string sect          = "";
        public string subj          = "";

    }
    public class coursesFieldsFromCsv {
        public int hTotalNumberColumns = 18;
        public int hSubj            = 0;
        public int hCourse          = 1;
        public int hSect            = 2;
        public int hCRN             = 3;
        public int hCourseName      = 4;
        public int hCredit          = 5;
        public int hMaxStudends     = 8;
        public int hAppr           = 10;
        public int hLongTitle      = 17;

    }

    public class coursesofferFields {
        public string Id             = "";
        public string course         = "";
        public string prof_name      = "";
        public string prof_id        = "";
        public string course_year    = "";
        public string course_semester= "";
    }
    public class coursesofferFieldsFromCsv {
        public int hTotalNumberColumns = 4;
        public int hProf_Name       = 0;
        public int hCourse          = 1;
        public int hCourse_Year     = 2;
        public int hCourse_Semester = 3;
    }
    public class semestersFields {
        public string Id            = "";
        public string SemesterTime  = "";
        public string From          = "";
        public string To            = "";

    }
    public class semestersFieldsFromCsv {
        public int hTotalNumberColumns = 3;
        public int hSemesterTime       = 0;
        public int hFrom               = 1;
        public int hTo                 = 2;

    }

    public class importCourseStatus {
        public int addcount    = 0;
        public int updatecount = 0;
        public int errorcount  = 0;
        public string status   = "";
    }

    public class courseScheduleFields {
        public string Id                 = "";
        public string courseNum          = "";
        public string section            = "";
        public string creditHours        = "";
        public string courseTitle        = "";
        public string crn                = "";
        public string maxStudent         = "";
        public string weekday            = "";
        public string instructor         = "";
        public string scheduleStartTime  = "";
        public string scheduleEndTime    = "";
        public string room               = "";
        public string notes              = "";
        public string semesterTime       = "";
        public string semesterId         = "";

    }
    public class courseScheduleFieldsFromCsv {
        public int hTotalNumberColumns = 13;
        public int hCourseNum         = 0;
        public int hSection           = 1;
        public int hCreditHours       = 2;
        public int hCourseTitle       = 3;
        public int hCRN               = 4;
        public int hMaxStudent        = 5;
        public int hWeekday           = 6;
        public int hInstructor        = 7;
        public int hScheduleStartTime = 8;
        public int hScheduleEndTime   = 9;
        public int hRoom              = 10;
        public int hNotes             = 11;
        public int hSemesterTime      = 12;

    }


} 