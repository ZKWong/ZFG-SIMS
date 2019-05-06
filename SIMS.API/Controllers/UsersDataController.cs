using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using SIMS.API.Data;
using SIMS.API.Dtos;
using SIMS.API.Models;
using SIMS.API.Properties;
using System.IO;
using System.Data;
using System.Data.Odbc;
using Microsoft.Extensions.Configuration;

namespace SIMS.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersDataController: ControllerBase
    {
        private readonly IConfiguration _configuration;

        public UsersDataController(IConfiguration Configuration)
        {
            _configuration = Configuration;
        }

        [AllowAnonymous]
        [HttpPost("importfile/{fileName}")]
        public async Task<IActionResult> importfile(string fileName,
                                                    [FromForm]FileForCreationDto objFile)
        {
            Console.WriteLine("fileName: " + fileName);
            var file        = objFile.File;
            string wwwroot  = _configuration.GetConnectionString("wwwroot");
            if (!Directory.Exists(wwwroot)) { Directory.CreateDirectory(wwwroot); }
            string FilePath = wwwroot + @"repo\data\";
            string FileN    = DateTime.Now.ToString("yyyyMMddHHmmss") + "_" + UniqueKey.GetUniqueKey(16)  + "_" + fileName;
            string fullFile = FilePath + @"\" + FileN;;
            importDataStatus importStatus = new importDataStatus();

            if (file.Length > 0)
            {
                if (!Directory.Exists(FilePath)) { Directory.CreateDirectory(FilePath); }
                var sf1  = new FileStream(fullFile, FileMode.Create);
                await file.CopyToAsync(sf1);        
                sf1.Close();
                sf1.Dispose();
                importStatus.status = "*";
                updateUserTable(fullFile,importStatus);

                return Ok(importStatus.status);
                
            }
            return BadRequest("Could not import the file");
        }

        [AllowAnonymous]
        [HttpPost("importfacultyfile/{fileName}")]
         public async Task<IActionResult> importfacultyfile(string fileName,
                                                    [FromForm]FileForCreationDto objFile)
        {
            Console.WriteLine("fileName: " + fileName);
            var file        = objFile.File;
            string wwwroot  = _configuration.GetConnectionString("wwwroot");
            if (!Directory.Exists(wwwroot)) { Directory.CreateDirectory(wwwroot); }
            string FilePath = wwwroot + @"repo\faculty\";
            string FileN    = DateTime.Now.ToString("yyyyMMddHHmmss") + "_" + UniqueKey.GetUniqueKey(16)  + "_" + fileName;
            string fullFile = FilePath + @"\" + FileN;;
            importDataStatus importStatus = new importDataStatus();

            if (file.Length > 0)
            {
                if (!Directory.Exists(FilePath)) { Directory.CreateDirectory(FilePath); }
                var sf1  = new FileStream(fullFile, FileMode.Create);
                await file.CopyToAsync(sf1);        
                sf1.Close();
                sf1.Dispose();
                importStatus.status = "*";
                updateFacultyTable(fullFile,importStatus);

                return Ok(importStatus.status);
                
            }
            return BadRequest("Could not import the file");
        }

        [AllowAnonymous]
        [HttpGet("GetFullUserData")]
        public async Task<IActionResult> GetFullUserData(){
            string connstr = _configuration.GetConnectionString("ODBC_DSN");
            OdbcConnection cnn;
            OdbcCommand    cmd1;
            string sxql = "select * " +
                          "from AspNetUsers u " + 
                          "left join AspNetUserRoles r on u.id=r.userid " +
                          "where r.roleid=5 " +
                          "order by u.UserName";
            cnn = new OdbcConnection(connstr);
            cmd1=new OdbcCommand(sxql, cnn);
            OdbcDataReader reader1;
            string sb = "[";
            int hCount=0;
            int hTotCol = 0;
            string sName  = "";
            string sValue = "";
            try {
                cnn.Open();
                reader1=cmd1.ExecuteReader();
                while ( reader1.Read() ) {
                    hCount++;
                    hTotCol = reader1.FieldCount;
                    if (sb == "[") {
                        sb = sb + "{";
                    } else {
                        sb = sb + ",{";
                    }
                    for (int f=0; f<hTotCol; f++){
                        sName = reader1.GetName(f);
                        if (skipThisField(sName)==1) { continue; }
                        sValue = reader1[f].ToString();
                        if (f == 0) {
                            sb = sb + "\"row\":\"" + hCount + "\"," + "\""+sName+"\":\"" + sValue + "\"";
                        } else {
                            sb = sb + ",\""+sName+"\":\"" + sValue + "\"";
                        }
                    }
                    sb = sb + "}";
                }
                cnn.Close();
                Console.WriteLine("hCount: " + hCount);
            } catch ( Exception e) {
                Console.WriteLine(e);
            }
            sb = sb + "]";
            return Ok(sb);
        }
        [AllowAnonymous]
        [HttpGet("GetUserData/{Id}")]
        public async Task<IActionResult> GetUserData(string Id){
            string connstr = _configuration.GetConnectionString("ODBC_DSN");
            OdbcConnection cnn;
            OdbcCommand    cmd1;
             string sxql = "select u.*,ba.advisorname as BscProjAdvisorName, "+
                          "m.mentorname as BscMentorName "+
                          "from AspNetUsers u "+
                          "left join BachelorsProjectAdvisor ba on ba.UserId=u.Id "+
                          "left join BachelorsMentor m on m.UserId=u.Id "+
                          "where u.Id="+Id;

            cnn = new OdbcConnection(connstr);
            cmd1=new OdbcCommand(sxql, cnn);
            OdbcDataReader reader1;
            string sb = "";
            int hCount=0;
            int hTotCol = 0;
            string sName  = "";
            string sValue = "";
            try {
                cnn.Open();
                reader1=cmd1.ExecuteReader();
                while ( reader1.Read() ) {
                    hCount++;
                    hTotCol = reader1.FieldCount;
                    if (sb == "") {
                        sb = sb + "{";
                    } else {
                        sb = sb + ",{";
                    }
                    for (int f=0; f<hTotCol; f++){
                        sName = reader1.GetName(f);
                        if (skipThisField(sName)==1) { continue; }
                        sValue = reader1[f].ToString();
                        if (f == 0) {
                            sb = sb + "\"row\":\"" + hCount + "\"," + "\""+sName+"\":\"" + sValue + "\"";
                        } else {
                            sb = sb + ",\""+sName+"\":\"" + sValue + "\"";
                        }
                    }
                    sb = sb + "}";
                }
                cnn.Close();
                Console.WriteLine("hCount: " + hCount);
            } catch ( Exception e) {
                Console.WriteLine(e);
            }
            sb = (sb == "") ? "[]": sb;
            return Ok(sb);
        }

        [AllowAnonymous]
        [HttpGet("GetFacultyData")]
        public async Task<IActionResult> GetFacultyData(){
            string connstr = _configuration.GetConnectionString("ODBC_DSN");
            OdbcConnection cnn;
            OdbcCommand    cmd1;
            string sxql = "select * " +
                          "from faculty " + 
                          "order by last_name";
            cnn = new OdbcConnection(connstr);
            cmd1=new OdbcCommand(sxql, cnn);
            OdbcDataReader reader1;
            string sb = "[";
            int hCount=0;
            int hTotCol = 0;
            string sName  = "";
            string sValue = "";
            try {
                cnn.Open();
                reader1=cmd1.ExecuteReader();
                while ( reader1.Read() ) {
                    hCount++;
                    hTotCol = reader1.FieldCount;
                    if (sb == "[") {
                        sb = sb + "{";
                    } else {
                        sb = sb + ",{";
                    }
                    for (int f=0; f<hTotCol; f++){
                        sName = reader1.GetName(f);
                        if (skipThisField(sName)==1) { continue; }
                        sValue = reader1[f].ToString();
                        if (f == 0) {
                            sb = sb + "\"row\":\"" + hCount + "\"," + "\""+sName+"\":\"" + sValue + "\"";
                        } else {
                            sb = sb + ",\""+sName+"\":\"" + sValue + "\"";
                        }
                    }
                    sb = sb + "}";
                }
                cnn.Close();
                Console.WriteLine("hCount: " + hCount);
            } catch ( Exception e) {
                Console.WriteLine(e);
            }
            sb = sb + "]";
            return Ok(sb);
        }

        [AllowAnonymous]
        [HttpPost("updateUserProfile")]
        public async Task<IActionResult> updateUserProfile([FromBody] dynamic userprofile)
        {
            userdataFields u = new userdataFields();
            foreach (JProperty fld in userprofile)
            {
                switch(fld.Name.ToLower()){
                    case "id":
                      u.Id = (string)fld.Value;
                      break;
                    case "bachelorsstartdate":
                      u.BachelorStartDate = (string)fld.Value;
                      break;
                    case "bachelorsmentor":
                      u.BachelorsMentor = (string)fld.Value;
                      break;
                    case "bachelorsprojectadvisor":
                      u.BachelorsProjectAdvisor = (string)fld.Value;
                      break;
                    case "bachelorsthesisadvisor":
                      u.BachelorsThesisAdvisor = (string)fld.Value;
                      break;
                    case "bachelorsprojecttitle":
                      u.BachelorProjectTitle = (string)fld.Value;
                      break;
                    case "bachelorsthesistitle":
                      u.BachelorThesisTitle = (string)fld.Value;
                      break;
                    case "bachelorsgraddate":
                      u.BachelorGradDate = (string)fld.Value;
                      break;
                    case "mastersstartdate":
                      u.MasterStartDate = (string)fld.Value;
                      break;
                    case "mastersprojectadvisor":
                      u.MasterProjectAdvisor = (string)fld.Value;
                      break;
                    case "mastersthesisadvisor":
                      u.MastersThesisAdvisor = (string)fld.Value;
                      break;
                    case "masterscommmember1":
                      u.MasterCommMember1 = (string)fld.Value;
                      break;
                    case "masterscommmember2":
                      u.MasterCommMember2 = (string)fld.Value;
                      break;
                    case "masterscommmember3":
                      u.MasterCommMember3 = (string)fld.Value;
                      break;
                    case "masterscommmember4":
                      u.MasterCommMember4 = (string)fld.Value;
                      break;
                    case "masterscommmember5":
                      u.MasterCommMember5 = (string)fld.Value;
                      break;
                    case "masterscommformeddate":
                      u.MasterCommFormedDate = (string)fld.Value;
                      break;
                    case "mastersdefensedate":
                      u.MasterdefenseDate = (string)fld.Value;
                      break;
                    case "mastersprojecttitle":
                      u.MasterProjectTitle = (string)fld.Value;
                      break;
                    case "mastersthesistitle":
                      u.MasterThesisTitle = (string)fld.Value;
                      break;
                    case "mastersgraddate":
                      u.MasterGraduationDate = (string)fld.Value;
                      break;
                    default:
                      break;
                }
            }
            string xDate   = u.BachelorStartDate;
            // u.BachelorStartDate = xDate.Substring(6,4) +'-'+ xDate.Substring(0,2) +'-'+ xDate.Substring(3,2);
            // xDate   = u.BachelorGradDate;
            // u.BachelorGradDate = xDate.Substring(6,4) +'-'+ xDate.Substring(0,2) +'-'+ xDate.Substring(3,2);
            DateTime dateStart;
            //dateStart = dateStart.AddDays(1);
            if(u.BachelorStartDate.Substring(4,1)!="-") {
                //dateStart = Convert.ToDateTime(u.BachelorStartDate);
                //u.BachelorStartDate = dateStart.ToString("yyyy-MM-dd");
                u.BachelorStartDate = xDate.Substring(6,4) +'-'+ xDate.Substring(0,2) +'-'+ xDate.Substring(3,2);
            }
            if(u.BachelorGradDate.Substring(4,1)!="-") {
                //dateStart = Convert.ToDateTime(u.BachelorGradDate);
                //dateStart = dateStart.AddDays(1);
                //u.BachelorGradDate = dateStart.ToString("yyyy-MM-dd");
                xDate   = u.BachelorGradDate;
                u.BachelorGradDate = xDate.Substring(6,4) +'-'+ xDate.Substring(0,2) +'-'+ xDate.Substring(3,2);
            }
            if(u.MasterStartDate.Substring(4,1)!="-") {
               xDate   = u.MasterStartDate;
               u.MasterStartDate = xDate.Substring(6,4) +'-'+ xDate.Substring(0,2) +'-'+ xDate.Substring(3,2);
            }
            if(u.MasterCommFormedDate.Substring(4,1)!="-") {
               xDate   = u.MasterCommFormedDate;
               u.MasterCommFormedDate = xDate.Substring(6,4) +'-'+ xDate.Substring(0,2) +'-'+ xDate.Substring(3,2);
            }
            if(u.MasterdefenseDate.Substring(4,1)!="-") {
                xDate   = u.MasterdefenseDate;
               u.MasterdefenseDate = xDate.Substring(6,4) +'-'+ xDate.Substring(0,2) +'-'+ xDate.Substring(3,2);
            }
            if(u.MasterGraduationDate.Substring(4,1)!="-") {
                xDate   = u.MasterGraduationDate;
               u.MasterGraduationDate = xDate.Substring(6,4) +'-'+ xDate.Substring(0,2) +'-'+ xDate.Substring(3,2);
            }
            Console.WriteLine(u.BachelorStartDate);
            Console.WriteLine(u.BachelorsMentor);
            Console.WriteLine(u.BachelorsProjectAdvisor);
            Console.WriteLine(u.BachelorsThesisAdvisor);
            Console.WriteLine(u.BachelorProjectTitle);
            Console.WriteLine(u.BachelorThesisTitle);
            Console.WriteLine(u.BachelorGradDate);
            
            string sXql    = "";
            string connstr = _configuration.GetConnectionString("ODBC_DSN");
            OdbcConnection cnn;
            OdbcCommand    cmd1;
            cnn            = new OdbcConnection(connstr);
            sXql           = "update aspnetusers set BachelorsStartDate='"+u.BachelorStartDate+"'," +
                             "BachelorsMentor='"+u.BachelorsMentor+"',BachelorsProjectAdvisor='" + u.BachelorsProjectAdvisor + "'," +
                             "BachelorsThesisAdvisor='"+u.BachelorsThesisAdvisor+"'," +
                             "BachelorsProjectTitle='"+u.BachelorProjectTitle+"'," +
                             "BachelorsThesisTitle='"+u.BachelorThesisTitle+"',"+
                             "BachelorsGradDate='"+u.BachelorGradDate+"', " +
                             "MastersStartDate='"+u.MasterStartDate+"', " +
                             "MastersProjectAdvisor='"+u.MasterProjectAdvisor+"', " +
                             "MastersThesisAdvisor='"+u.MastersThesisAdvisor+"', " +
                             "MastersCommMember1='"+u.MasterCommMember1+"', " +
                             "MastersCommMember2='"+u.MasterCommMember2+"', " +
                             "MastersCommMember3='"+u.MasterCommMember3+"', " +
                             "MastersCommMember4='"+u.MasterCommMember4+"', " +
                             "MastersCommMember5='"+u.MasterCommMember5+"', " +
                             "MastersCommFormedDate='"+u.MasterCommFormedDate+"', " +
                             "MastersDefenseDate='"+u.MasterdefenseDate+"', " +
                             "MastersProjectTitle='"+u.MasterProjectTitle+"', " +
                             "MastersThesisTitle='"+u.MasterThesisTitle+"', " +
                             "MastersGradDate='"+u.MasterGraduationDate+"' " +
                             "where Id="+u.Id;
            try {
                cnn.Open();
                cmd1=new OdbcCommand(sXql, cnn);
                cmd1.ExecuteNonQuery();
                cnn.Close();
            } catch (Exception e) {
                Console.WriteLine(e);
            }
            return Ok();
        }
        public int updateUserTable(string userdata_csv, importDataStatus importStatus){
            string[] csv_fields;
            userdataFieldsFromCsv uc = new userdataFieldsFromCsv();
            userdataFields u         = new userdataFields();
            int hCount               = 0;
            string sXql              = "";
            string connstr = _configuration.GetConnectionString("ODBC_DSN");
            OdbcConnection cnn;
            OdbcCommand    cmd1;
            cnn            = new OdbcConnection(connstr);
            OdbcDataReader reader1;
            int hNumrec    = 0;
            string sxql_role = "";
            int hNewRecord = 0;

            foreach (string line in System.IO.File.ReadLines(userdata_csv)) {
                csv_fields = line.Split(",");
                
                if ( csv_fields[0] == "login") { continue; }
                if (csv_fields.Length < uc.hTotalNumberColumns) {
                    importStatus.errorcount++;
                    Console.WriteLine("this row has less than "+uc.hTotalNumberColumns+" columns, skip this row");
                    continue;
                }
                
                u.UserName                 = csv_fields[uc.hUserName];
                u.PhoneNumber              = csv_fields[uc.hPhoneNumber];
                u.Email                    = csv_fields[uc.hEmail];
                u.DegreeProgram            = csv_fields[uc.hDegreeProgram];
                u.FirstName                = csv_fields[uc.hFirstName];
                u.LastName                 = csv_fields[uc.hLastName];
                u.BachelorStartDate        = csv_fields[uc.hBscStartYear];
                u.BachelorGradDate         = csv_fields[uc.hBscGradYear];
                u.BachelorProjectTitle     = csv_fields[uc.hBscProjTitle];
                u.MasterStartDate          = csv_fields[uc.hMscStartYear];
                u.MasterdefenseDate        = csv_fields[uc.hMscDefendYear];
                u.MasterGraduationDate     = csv_fields[uc.hMscGradYear];
                u.MasterThesisTitle        = csv_fields[uc.hMscThesisTitle];
                u.DateAcceptedForCandidate = csv_fields[uc.hCandidateAcceptedYear];
                u.DissertationDefenseDate  = csv_fields[uc.hDissertationYear];
                u.DoctorateGradDate        = csv_fields[uc.hDoctorateGradYear];
                u.DissertationTitle        = csv_fields[uc.hDissertationTitle];
                u.CurrentProgram           = csv_fields[uc.hCurrentProgram];
                u.CurrentAcademicLevel     = csv_fields[uc.hCurrentLevel];
                u.MasterCommMember1        = csv_fields[uc.hMscCommMem1];
                u.MasterCommMember2        = csv_fields[uc.hMscCommMem2];
                u.MasterCommMember3        = csv_fields[uc.hMscCommMem3];
                u.MastersThesisAdvisor     = csv_fields[uc.hMscAdvisor];
                u.BscMentorName            = csv_fields[uc.hBMentor];
                u.BscAdvisorName           = csv_fields[uc.hBAdvisor];

                u.BachelorStartDate        = formatDateString(u.BachelorStartDate,uc.hBscStartYear,csv_fields);
                u.BachelorGradDate         = formatDateString(u.BachelorGradDate,uc.hBscGradYear,csv_fields);
                u.MasterStartDate          = formatDateString(u.MasterStartDate,uc.hMscStartYear,csv_fields);
                u.MasterdefenseDate        = formatDateString(u.MasterdefenseDate,uc.hMscDefendYear,csv_fields);
                u.MasterGraduationDate     = formatDateString(u.MasterGraduationDate,uc.hMscGradYear,csv_fields);
                u.DateAcceptedForCandidate = formatDateString(u.DateAcceptedForCandidate,uc.hCandidateAcceptedYear,csv_fields);
                u.DissertationDefenseDate  = formatDateString(u.DissertationDefenseDate,uc.hDissertationYear,csv_fields);
                u.DoctorateGradDate        = formatDateString(u.DoctorateGradDate,uc.hDoctorateGradYear,csv_fields);
                u.NormalizedUserName       = u.UserName.ToUpper();
                u.KnownAs                  = u.FirstName;

                sXql   ="select count(*) as hnumrec from aspnetusers where UserName='"+u.UserName+"'";
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
                sxql_role = "";
                hNewRecord= 0;
                u.Id      = "";
                if (hNumrec==0) {
                    importStatus.addcount++;
                    hNewRecord=1;
                    sXql = "insert into aspnetusers (UserName,NormalizedUserName,PhoneNumber,Email,DegreeProgram,FirstName," +
                             "LastName,BachelorsStartDate,BachelorsGradDate,BachelorsProjectTitle,MastersStartDate," +
                             "MastersDefenseDate,MastersGradDate,MastersThesisTitle,DateAcceptedForCandidacy," +
                             "DissertationDefenseDate,DoctorateGradDate,DissertationTitle,CurrentProgram," +
                             "EmailConfirmed,PhoneNumberConfirmed,TwoFactorEnabled,LockoutEnabled," +
                             "AccessFailedCount,DateOfBirth,MastersCommFormedDate," +
                             "DoctoralCandidate,passwordhash,CurrentAcademicLevel,SecurityStamp,DoctorateStartDate,"+
                             "DoctorateCommFormDate,MastersThesisAdvisor,MastersCommMember1,MastersCommMember2,MastersCommMember3,"+
                             "BachelorsMentor,BachelorsProjectAdvisor) values " +
                           "('"+u.UserName+"','"+u.NormalizedUserName+"','"+u.PhoneNumber+"','"+u.Email+"','"+u.DegreeProgram+"'," +
                            "'"+u.FirstName+"','"+u.LastName+"','"+u.BachelorStartDate+"','"+u.BachelorGradDate+"'," +
                            "'"+u.BachelorProjectTitle+"','"+u.MasterStartDate+"','"+u.MasterdefenseDate+"'," +
                            "'"+u.MasterGraduationDate+"','"+u.MasterThesisTitle+"','"+u.DateAcceptedForCandidate+"'," +
                            "'"+u.DissertationDefenseDate+"','"+u.DoctorateGradDate+"','"+u.DissertationTitle+"'," +
                            "'"+u.CurrentProgram+"',"+u.EmailConfirmed+","+u.PhoneNumberConfirmed+"," +
                                u.TwoFactorEnabled+","+u.LockoutEnabled+","+u.AccessFailedCount+"," +
                            "'"+u.DateOfBirth+"','"+u.CommFormedDate+"'," +
                               +u.DoctoralCandidate+","+
                               "'AQAAAAEAACcQAAAAEJjHznKiR5+mSJtFT6R4k4ocrlnLCXoLxLocNShnEvo3ieoRfAkiVeO5bFNVwXiJnw==',"+
                            "'"+u.CurrentAcademicLevel+"','HL73BPTRBVVVRJKGYQ5XHPHTSYR67LQR','2019-01-01','2019-01-01'," +
                            "'"+u.MastersThesisAdvisor+"','"+u.MasterCommMember1+"','"+u.MasterCommMember2+"','"+u.MasterCommMember3+"',"+
                            "'"+u.BscMentorName+"','"+u.BscAdvisorName+"')";
                } 
                else if (hNumrec>0) {
                    importStatus.updatecount++;
                    sXql = "update aspnetusers set PhoneNumber='"+u.PhoneNumber+"',Email='"+u.Email+"',"+
                           " DegreeProgram='"+u.DegreeProgram+"',FirstName='"+u.FirstName+"',"+
                           " LastName='"+u.LastName+"',BachelorsStartDate='"+u.BachelorStartDate+"',"+
                           " BachelorsGradDate='"+u.BachelorGradDate+"',BachelorsProjectTitle='"+u.BachelorProjectTitle+"',"+
                           " MastersStartDate='"+u.MasterStartDate+"',MastersDefenseDate='"+u.MasterdefenseDate+"',"+
                           " MastersGradDate='"+u.MasterGraduationDate+"',MastersThesisTitle='"+u.MasterThesisTitle+"',"+
                           " DateAcceptedForCandidacy='"+u.DateAcceptedForCandidate+"',DissertationDefenseDate='"+u.DissertationDefenseDate+"',"+
                           " DoctorateGradDate='"+u.DoctorateGradDate+"',DissertationTitle='"+u.DissertationTitle+"',"+
                           " CurrentProgram='"+u.CurrentProgram+"', "+
                           " CurrentAcademicLevel='"+u.CurrentAcademicLevel+"', "+
                           "MastersThesisAdvisor='"+u.MastersThesisAdvisor+"',"+
                           "MastersCommMember1='"+u.MasterCommMember1+"',"+
                           "MastersCommMember2='"+u.MasterCommMember2+"',"+
                           "MastersCommMember3='"+u.MasterCommMember3+"',"+
                           "BachelorsMentor='"+u.BscMentorName+"',"+
                           "BachelorsProjectAdvisor='"+u.BscAdvisorName+"' "+
                           "where UserName='"+u.UserName+"'";
                } 
                else {
                    importStatus.errorcount++;
                }
                hCount++;

                if(sXql!=""){
                    try {
                        cmd1.CommandText=sXql;
                        cmd1.ExecuteNonQuery();
                        updateExitSurveyData(csv_fields);
                        updateBscProjectAdvisorTable(csv_fields);
                        updateBscMentorTable(csv_fields);
                    } catch ( Exception e) {
                        Console.WriteLine(e);
                    }
                    if (hNewRecord==1) {
                        sXql = "select Id from aspnetusers where UserName='"+u.UserName+"'";
                        try {
                            cmd1.CommandText=sXql;
                            reader1=cmd1.ExecuteReader();
                            while ( reader1.Read() ) {
                                u.Id = reader1["Id"].ToString();
                                break;
                            }
                            reader1.Close();
                            if(u.Id!="") {
                                sxql_role="insert into aspnetuserroles values ("+u.Id+",5)";
                                cmd1.CommandText=sxql_role;
                                cmd1.ExecuteNonQuery();
                            }
                        } catch ( Exception e) {
                            Console.WriteLine(e);
                        }
                    }
                }

            }
           
           if (hCount>0) {cnn.Close();}
            Console.WriteLine("Num of Records processed: " + hCount);
            importStatus.status = "Add: "+importStatus.addcount+
                                  "<br/>Update: "+importStatus.updatecount+
                                  "<br/>Error: "+importStatus.errorcount+
                                  "<br/>Total:"+(importStatus.addcount+importStatus.updatecount+importStatus.errorcount);
            return 1;
        }

        public int updateFacultyTable(string userdata_csv, importDataStatus importStatus){
            string[] csv_fields;
            facultydataFieldsFromCsv uc = new facultydataFieldsFromCsv();
            facultydataFields u         = new facultydataFields();
            int hCount               = 0;
            string sXql              = "";
            string connstr = _configuration.GetConnectionString("ODBC_DSN");
            OdbcConnection cnn;
            OdbcCommand    cmd1;
            cnn            = new OdbcConnection(connstr);
            OdbcDataReader reader1;
            int hNumrec    = 0;
            string sxql_role = "";
            int hNewRecord   = 0;

            foreach (string line in System.IO.File.ReadLines(userdata_csv)) {
                csv_fields = line.Split(",");
                
                if ( csv_fields[0] == "username") { continue; }
                if (csv_fields.Length < uc.hTotalNumberColumns) {
                    importStatus.errorcount++;
                    Console.WriteLine("this row has less than "+uc.hTotalNumberColumns+" columns, skip this row");
                    continue;
                }
                
                u.UserName                 = csv_fields[uc.hUserName];
                u.First_Name               = csv_fields[uc.hFirstName];
                u.Last_Name                = csv_fields[uc.hLastName];
                u.Title                    = csv_fields[uc.hTitle];
                u.Office                   = csv_fields[uc.hOffice];
                u.Phone                    = csv_fields[uc.hPhone];
                u.Research_Int             = csv_fields[uc.hResearch_Int];
                u.Designation              = csv_fields[uc.hDesignation];
                u.Current                  = csv_fields[uc.hCurrent];
                u.Email                    = csv_fields[uc.hEmail];
                u.Homepage                 = csv_fields[uc.hHomepage];
                
                sXql   ="select count(*) as hnumrec from faculty where username='"+u.UserName+"'";
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
                sxql_role = "";
                hNewRecord= 0;
                u.Id      = "";
                if (hNumrec==0) {
                    importStatus.addcount++;
                    hNewRecord=1;
                    sXql = "insert into faculty (username,first_name,last_name,title,office,phone," +
                             "research_interest,designation,current,current,email,homepage) values " +
                           "('"+u.UserName+"','"+u.First_Name+"','"+u.Last_Name+"','"+u.Title+"','"+u.Office+"'," +
                            "'"+u.Phone+"','"+u.Research_Int+"','"+u.Designation+"','"+u.Current+"'," +
                            "'"+u.Current+"','"+u.Email+"','"+u.Homepage+"')";
                } 
                else if (hNumrec>0) {
                    importStatus.updatecount++;
                    sXql = "update faculty set first_name='"+u.First_Name+"',last_name='"+u.Last_Name+"',"+
                           " title='"+u.Title+"',office='"+u.Office+"',phone='"+u.Phone+"',"+
                           " research_interest='"+u.Research_Int+"',designation='"+u.Designation+"',"+
                           " current='"+u.Current+"',email='"+u.Email+"',homepage='"+u.Homepage+"' "+ 
                           "where username='"+u.UserName+"'";
                } 
                else {
                    importStatus.errorcount++;
                }
                hCount++;

                if(sXql!=""){
                    try {
                        cmd1.CommandText=sXql;
                        cmd1.ExecuteNonQuery();
                        hNewRecord = 99;
                    } catch ( Exception e) {
                        Console.WriteLine(e);
                    }

                    if (hNewRecord == 99) { //proceed to see if need to add record into aspnetusers
                        sXql   ="select count(*) as hnumrec from aspnetusers where username='"+u.UserName+"'";
                        cmd1.CommandText=sXql;
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
                        if (hNumrec==0){ //insert a new record into aspnetusers for this faculty
                            sXql = "insert into aspnetusers (username,normalizedusername,emailconfirmed,"+
                                    "MastersDefenseDate,MastersGradDate,MastersThesisTitle,DateAcceptedForCandidacy," +
                                    "DissertationDefenseDate,DoctorateGradDate,DissertationTitle,CurrentProgram," +
                                    "PhoneNumberConfirmed,TwoFactorEnabled,LockoutEnabled," +
                                    "AccessFailedCount,DateOfBirth,MastersCommFormedDate," +
                                    "DoctoralCandidate,bachelorsstartdate,bachelorsgraddate,mastersstartdate,passwordhash,SecurityStamp,"+
                                    "DoctorateStartDate,DoctorateCommFormDate) values "+
                                    "('"+u.UserName+"','"+u.UserName.ToUpper()+"',0,'2019-01-01','2019-01-01','NA',"+
                                    "'2019-01-01','2019-01-01','2019-01-01','NA','NA',0,0,0,0,'2019-01-01',"+
                                    "'2019-01-01',0,'2019-01-01','2019-01-01','2019-01-01',"+
                                    "'AQAAAAEAACcQAAAAEJjHznKiR5+mSJtFT6R4k4ocrlnLCXoLxLocNShnEvo3ieoRfAkiVeO5bFNVwXiJnw==','HL73BPTRBVVVRJKGYQ5XHPHTSYR67LQR',"+
                                    "'2019-01-01','2019-01-01')";
                            try {
                                cmd1.CommandText=sXql;
                                cmd1.ExecuteNonQuery();
                            } catch ( Exception e) {
                                Console.WriteLine(e);
                            }
                            sXql = "select Id from aspnetusers where UserName='"+u.UserName+"'";
                            u.Id = "";
                            try {
                                cmd1.CommandText=sXql;
                                reader1=cmd1.ExecuteReader();
                                while ( reader1.Read() ) {
                                    u.Id = reader1["Id"].ToString();
                                    break;
                                }
                                reader1.Close();
                                if(u.Id!="") {
                                    sxql_role="insert into aspnetuserroles values ("+u.Id+",3)";
                                    cmd1.CommandText=sxql_role;
                                    cmd1.ExecuteNonQuery();
                                }
                            } catch ( Exception e) {
                                Console.WriteLine(e);
                            }
                        }
                    }
                    
                }

            }
            if (hCount>0) {cnn.Close();}
            Console.WriteLine("Num of Records processed: " + hCount);
            importStatus.status = "Add: "+importStatus.addcount+
                                  "<br/>Update: "+importStatus.updatecount+
                                  "<br/>Error: "+importStatus.errorcount+
                                  "<br/>Total:"+(importStatus.addcount+importStatus.updatecount+importStatus.errorcount);
            return 1;
        }

        public int updateExitSurveyData(params string[] csv_fields){
            userdataFieldsFromCsv uc = new userdataFieldsFromCsv();
            userdataFields u         = new userdataFields();
            u.BachelorGradDate       = csv_fields[uc.hBscGradYear];
            u.BachelorGradDate       = formatDateString(u.BachelorGradDate,uc.hBscGradYear,csv_fields);
            DateTime d1 = DateTime.ParseExact(u.BachelorGradDate,"yyyy-MM-dd",System.Globalization.CultureInfo.InvariantCulture);
            int hGradDay= (d1-DateTime.Now).Days;
            if (hGradDay>0) { //no yet graduate, skip survey data
                Console.WriteLine("Not yet graduate, skip update survey data");
                return 0; 
            } 
            u.SsId                   = csv_fields[uc.hStudent_Id];
            if (String.IsNullOrEmpty(u.SsId)==true) {
                Console.WriteLine("Value SsId is blank, skip update exitsurvey");
                return 0; 
            }

            string sXql              = "";
            string connstr = _configuration.GetConnectionString("ODBC_DSN");
            OdbcConnection cnn;
            OdbcCommand    cmd1;
            cnn            = new OdbcConnection(connstr);
            OdbcDataReader reader1;
            int hNumrec    = 0;

            u.furtherStudyScholarship  = csv_fields[uc.hScholarship];
            u.FirstName                = csv_fields[uc.hFirstName];
            u.LastName                 = csv_fields[uc.hLastName];
            u.DegreeProgram            = csv_fields[uc.hDegreeProgram];
            u.termGraduateYear         = csv_fields[uc.hBscGradYear];
            u.termGraduateSemester     = csv_fields[uc.hBscGradMth];
            u.contact1PhoneCell        = csv_fields[uc.hPhoneNumber];
            u.contact1PhoneHome        = csv_fields[uc.hPhoneNumberHome];
            u.contact1PhoneWork        = csv_fields[uc.hPhoneNumberWork];
            u.assessQ1                 = csv_fields[uc.hAssessQ1];
            u.assessQ2                 = csv_fields[uc.hAssessQ2];
            u.jobCompany               = csv_fields[uc.hJobCompany];
            u.jobCity                  = csv_fields[uc.hJobCity];
            u.jobCompanyWeb            = csv_fields[uc.hJobCompanyWeb];
            u.jobTitle                 = csv_fields[uc.hJobTitle];
            u.networkingQ1             = csv_fields[uc.hNetworkingQ1];
            u.networkingQ2             = csv_fields[uc.hNetworkingQ2];
            u.futherStudySchool        = csv_fields[uc.hFurtherStudySchool];

            u.StudentName              = u.FirstName + " " + u.LastName;
            u.termGraduateSemester     = (u.termGraduateSemester.ToLower() == "may") ? "Spring": u.termGraduateSemester;
            u.termGraduateSemester     = (u.termGraduateSemester.ToLower() == "dec") ? "Fall": u.termGraduateSemester;
            u.termGraduateSemester     = (u.termGraduateSemester.ToLower() == "december") ? "Fall": u.termGraduateSemester;

            switch(u.DegreeProgram){
                case "B":
                    u.DegreeProgram="B.S.";
                    break;
                case "M":
                    u.DegreeProgram="M.S.";
                    break;
                case "P":
                    u.DegreeProgram="Ph.D.";
                    break;
                default:
                    break;
            }

            switch(u.assessQ1.ToLower()){
                case "ex":
                    u.assessQ1 = "Exceeds";
                    break;
                case "mt":
                    u.assessQ1 = "Meets";
                    break;
                case "ma":
                    u.assessQ1 = "Marginally Acceptable";
                    break;
                case "un":
                    u.assessQ1 = "Unacceptable";
                    break;
                default:
                    break;
            }

            switch(u.assessQ2.ToLower()){
                case "ex":
                    u.assessQ2 = "Exceeds";
                    break;
                case "mt":
                    u.assessQ2 = "Meets";
                    break;
                case "ma":
                    u.assessQ2 = "Marginally Acceptable";
                    break;
                case "un":
                    u.assessQ2 = "Unacceptable";
                    break;
                default:
                    break;
            }
            
            sXql   ="select count(*) as hnumrec from exitsurveys where ssid='"+u.SsId+"'";
            cmd1   =new OdbcCommand(sXql, cnn);
            hNumrec=-1;

            try {
                cnn.Open();
                reader1=cmd1.ExecuteReader();
                while ( reader1.Read() ) {
                    hNumrec = Convert.ToInt32(reader1["hnumrec"].ToString());
                    break;
                }
                reader1.Close();
            } catch ( Exception e) {
                Console.WriteLine(e);
                return 0;
            }

            sXql      = "";
            if (hNumrec==0) {
                sXql = "insert into exitsurveys (surveydate,studentName,ssid,degreeprogram,termgraduatesemester,"+
                         "termgraduateyear,contact1phonecell,contact1phonehome,contact1phonework,assessq1,assessq2,"+
                         "furtherstudyschool,furtherstudyscholarship,jobcompany,jobcity,jobtitle,jobcompanyweb,"+
                         "networkingq1,networkingq2) values " +
                        "('"+u.BachelorGradDate+"','"+u.StudentName+"','"+u.SsId+"','"+u.DegreeProgram+"',"+
                        "'"+u.termGraduateSemester+"','"+u.termGraduateYear+"','"+u.contact1PhoneCell+"',"+
                        "'"+u.contact1PhoneHome+"','"+u.contact1PhoneWork+"','"+u.assessQ1+"'," +
                        "'"+u.assessQ2+"','"+u.futherStudySchool+"','"+u.furtherStudyScholarship+"'," +
                        "'"+u.jobCompany+"','"+u.jobCity+"','"+u.jobTitle+"'," +
                        "'"+u.jobCompanyWeb+"','"+u.networkingQ1+"','"+u.networkingQ2+"')";
            } else if (hNumrec>0) {
                sXql = "update exitsurveys set surveydate='"+u.BachelorGradDate+"',studentname='"+u.StudentName+"',"+
                        " degreeprogram='"+u.DegreeProgram+"',termgraduatesemester='"+u.termGraduateSemester+"',"+
                        " termgraduateyear='"+u.termGraduateYear+"',contact1phonecell='"+u.contact1PhoneCell+"',"+
                        " contact1phonehome='"+u.contact1PhoneHome+"',contact1phonework='"+u.contact1PhoneWork+"',"+
                        " assessq1='"+u.assessQ1+"',assessq2='"+u.assessQ2+"',"+
                        " furtherstudyschool='"+u.futherStudySchool+"',furtherstudyscholarship='"+u.furtherStudyScholarship+"',"+
                        " jobcompany='"+u.jobCompany+"',jobcity='"+u.jobCity+"',"+
                        " jobtitle='"+u.jobTitle+"',jobcompanyweb='"+u.jobCompanyWeb+"',"+
                        " networkingq1='"+u.networkingQ1+"',networkingq2='"+u.networkingQ2+"' "+
                        "where ssid='"+u.SsId+"'";
            } else {
                Console.WriteLine("updateExitSurveyData() error insert/update record");
            }

            if(sXql!=""){
                try {
                    cmd1.CommandText=sXql;
                    cmd1.ExecuteNonQuery();
                } catch ( Exception e) {
                    Console.WriteLine(e);
                }
            }

            cnn.Close();

            return 1;
        }
        
         public int updateBscProjectAdvisorTable(params string[] csv_fields){
            userdataFieldsFromCsv uc = new userdataFieldsFromCsv();
            userdataFields u         = new userdataFields();
            u.BscAdvisorName         = csv_fields[uc.hBAdvisor];
            u.UserName               = csv_fields[uc.hUserName];
            string sXql              = "";
            string connstr = _configuration.GetConnectionString("ODBC_DSN");
            OdbcConnection cnn;
            OdbcCommand    cmd1;
            cnn            = new OdbcConnection(connstr);
            OdbcDataReader reader1;
            int hNumrec    = 0;

            sXql   = "select Id from aspnetusers where username='"+u.UserName+"'";
            cmd1   = new OdbcCommand(sXql, cnn);
            u.Id   = "";

            try {
                cnn.Open();
                reader1=cmd1.ExecuteReader();
                while ( reader1.Read() ) {
                    u.Id = reader1["Id"].ToString();
                    break;
                }
                reader1.Close();
            } catch ( Exception e) {
                Console.WriteLine(e);
                return 0;
            }

            if ( u.Id == "" ) {
                Console.WriteLine("not matching record found in aspnetusers for username "+u.UserName);
                return 0;
            }

            sXql             = "select count(*) as hnumrec from BachelorsProjectAdvisor where UserId="+u.Id;
            cmd1.CommandText = sXql;
            hNumrec          = -1;

            try {
                reader1=cmd1.ExecuteReader();
                while ( reader1.Read() ) {
                    hNumrec = Convert.ToInt32(reader1["hnumrec"].ToString());
                    break;
                }
                reader1.Close();
            } catch ( Exception e) {
                Console.WriteLine(e);
                return 0;
            }

            u.BscAdvisorName = (u.BscAdvisorName == "") ? "NA" : u.BscAdvisorName ;
            sXql             = "";
            if (hNumrec==0) {
                sXql = "insert into BachelorsProjectAdvisor (UserId,AdvisorName) values " +
                        "("+u.Id+",'"+u.BscAdvisorName+"')";
            } else if (hNumrec>0) {
                sXql = "update BachelorsProjectAdvisor set AdvisorName='"+u.BscAdvisorName+"' "+
                        "where UserId="+u.Id;
            } else {
                Console.WriteLine("updateBscProjectAdvisorTable() error insert/update record");
            }

            if(sXql!=""){
                try {
                    cmd1.CommandText=sXql;
                    cmd1.ExecuteNonQuery();
                } catch ( Exception e) {
                    Console.WriteLine(e);
                }
            }

            cnn.Close();

            return 1;
        }

        public int updateBscMentorTable(params string[] csv_fields){
            userdataFieldsFromCsv uc = new userdataFieldsFromCsv();
            userdataFields u         = new userdataFields();
            u.BscMentorName         = csv_fields[uc.hBMentor];
            u.UserName               = csv_fields[uc.hUserName];
            string sXql              = "";
            string connstr = _configuration.GetConnectionString("ODBC_DSN");
            OdbcConnection cnn;
            OdbcCommand    cmd1;
            cnn            = new OdbcConnection(connstr);
            OdbcDataReader reader1;
            int hNumrec    = 0;

            sXql   = "select Id from aspnetusers where username='"+u.UserName+"'";
            cmd1   = new OdbcCommand(sXql, cnn);
            u.Id   = "";

            try {
                cnn.Open();
                reader1=cmd1.ExecuteReader();
                while ( reader1.Read() ) {
                    u.Id = reader1["Id"].ToString();
                    break;
                }
                reader1.Close();
            } catch ( Exception e) {
                Console.WriteLine(e);
                return 0;
            }

            if ( u.Id == "" ) {
                Console.WriteLine("not matching record found in aspnetusers for username "+u.UserName);
                return 0;
            }

            sXql             = "select count(*) as hnumrec from BachelorsMentor where UserId="+u.Id;
            cmd1.CommandText = sXql;
            hNumrec          = -1;

            try {
                reader1=cmd1.ExecuteReader();
                while ( reader1.Read() ) {
                    hNumrec = Convert.ToInt32(reader1["hnumrec"].ToString());
                    break;
                }
                reader1.Close();
            } catch ( Exception e) {
                Console.WriteLine(e);
                return 0;
            }

            u.BscMentorName = (u.BscMentorName == "") ? "NA" : u.BscMentorName ;
            sXql             = "";
            if (hNumrec==0) {
                sXql = "insert into BachelorsMentor (UserId,MentorName) values " +
                        "("+u.Id+",'"+u.BscMentorName+"')";
            } else if (hNumrec>0) {
                sXql = "update BachelorsMentor set MentorName='"+u.BscMentorName+"' "+
                        "where UserId="+u.Id;
            } else {
                Console.WriteLine("updateBscMentorTable() error insert/update record");
            }
            Console.WriteLine("updateMentor(): "+sXql);
            if(sXql!=""){
                try {
                    cmd1.CommandText=sXql;
                    cmd1.ExecuteNonQuery();
                } catch ( Exception e) {
                    Console.WriteLine(e);
                }
            }

            cnn.Close();

            return 1;
        
        }

        public string formatDateString(string sYear, int hDateIndex, string[] csv_fields){
            string sDate = "";

            if (Convert.ToInt32(sYear)<1900) {
                sDate = "1980-01-01";
                return sDate;
            }

            string sMth = csv_fields[hDateIndex+1];
            string sDay = csv_fields[hDateIndex+2];

            switch(sMth.ToLower()){
                case "jan":
                    sMth = "01";
                    break;
                case "feb":
                    sMth = "02";
                    break;
                case "mar":
                    sMth = "03";
                    break;
                case "apr":
                    sMth = "04";
                    break;
                case "may":
                    sMth = "05";
                    break;
                case "jun":
                    sMth = "06";
                    break;
                case "jul":
                    sMth = "07";
                    break;
                case "aug":
                    sMth = "08";
                    break;
                case "sep":
                    sMth = "09";
                    break;
                case "oct":
                    sMth = "10";
                    break;
                case "nov":
                    sMth = "11";
                    break;
                case "dec":
                    sMth = "12";
                    break;
                default:
                    break;
            }

            sDay = (Convert.ToInt32(sDay)<=0) ? "01": sDay ;
            sDay = (sDay.Length<2) ? "0" + sDay : sDay;

            sDate = sYear + "-" + sMth + "-" + sDay;

            return sDate;
        }

        public int skipThisField(string sField){
            switch(sField.ToLower()){
                case "passwordhash":
                    return 1;
                case "securitystamp":
                    return 1;
                case "concurrencystamp":
                    return 1;
                case "introduction":
                    return 1;
                case "lookingfor":
                    return 1;
                case "interests":
                    return 1;
                default:
                    break;
            }
            return 0;
        }
    
    }

    public class userdataFields {
        public string Id                       = "";
        public string UserName                 = "";
        public string NormalizedUserName       = "";
        public string PhoneNumber              = "";
        public string Email                    = "";
        public string DegreeProgram            = "";
        public string FirstName                = "";
        public string LastName                 = "";
        public string BachelorStartDate        = "";
        public string BachelorGradDate         = "";
        public string BachelorsMentor         = "";
        public string BachelorsProjectAdvisor = "";
        public string BachelorsThesisAdvisor  = "";
        public string BachelorProjectTitle     = "";
        public string BachelorThesisTitle     = "";
        public string MasterStartDate          = "";
        public string MasterdefenseDate        = "";
        public string MasterGraduationDate     = "";
        public string MasterThesisTitle        = "";
        public string DateAcceptedForCandidate = "";
        public string DissertationDefenseDate  = "";
        public string DoctorateGradDate        = "";
        public string DissertationTitle        = "";
        public string CurrentProgram           = "";
        public int EmailConfirmed              = 0;
        public int PhoneNumberConfirmed        = 0;
        public int TwoFactorEnabled            = 0;
        public int LockoutEnabled              = 0;
        public int AccessFailedCount           = 0;
        public string DateOfBirth              = "1980-01-01";
        public string Created                  = DateTime.Now.ToString("yyyy-MM-dd hh:mm:ss");
        public string LastActive               = "1980-01-01";
        public string CommFormedDate           = "1980-01-01";
        public int DoctoralCandidate           = 0;
        public string KnownAs                  = "";
        public string furtherStudyScholarship  = "";
        public string SsId                     = "";
        public string StudentName              = "";
        public string contact1PhoneCell        = "";
        public string contact1PhoneHome        = "";
        public string contact1PhoneWork        = "";
        public string assessQ1                 = "";
        public string assessQ2                 = "";
        public string jobCompany               = "";
        public string jobCity                  = "";
        public string jobCompanyWeb            = "";
        public string jobTitle                 = "";
        public string networkingQ1             = "";
        public string networkingQ2             = "";
        public string futherStudySchool       = "";
        public string termGraduateYear        = "";
        public string termGraduateSemester    = "";
        public string BscAdvisorName          = "";
        public string BscMentorName           = "";
        public string CurrentAcademicLevel    = "";
        public string MastersThesisAdvisor    = "";
        public string MasterCommMember1       = "";
        public string MasterCommMember2       = "";
        public string MasterCommMember3       = "";
        public string MasterCommMember4       = "";
        public string MasterCommMember5       = "";
        public string MasterProjectAdvisor    = "";
        public string MasterCommFormedDate    = "";
        public string MasterProjectTitle      = "";
    }
    public class userdataFieldsFromCsv {
        public int hTotalNumberColumns = 67;
        public int hUserName        = 0;
        public int hScholarship     = 3;
        public int hPhoneNumber     = 5;
        public int hPhoneNumberHome = 6;
        public int hEmail           = 8;
        public int hDegreeProgram   = 10;
        public int hStudent_Id      = 11;
        public int hFirstName       = 12;
        public int hLastName        = 13;
        public int hPhoneNumberWork = 16;
        public int hAssessQ1        = 17;
        public int hAssessQ2        = 18;
        public int hBscStartYear    = 19;
        public int hBscStartMth     = 20;
        public int hBscStartDay     = 21;
        public int hBscGradYear     = 22;
        public int hBscGradMth      = 23;
        public int hBscGradDay      = 24;
        public int hBMentor         = 25;
        public int hBAdvisor        = 26;
        public int hBscProjTitle    = 27;
        public int hMscStartYear    = 29;
        public int hMscStartMth     = 30;
        public int hMscStartDay     = 31;
        public int hMscDefendYear   = 32;
        public int hMscDefenseMth   = 33;
        public int hMscDefenseDay   = 34;
        public int hMscGradYear     = 35;
        public int hMscGradMth      = 36;
        public int hMscGradDay      = 37;
        public int hMscCommMem1     = 38;
        public int hMscCommMem2     = 39;
        public int hMscCommMem3     = 40;
        public int hMscAdvisor      =41;
        public int hMscThesisTitle  = 42;
        public int hCandidateAcceptedYear = 48;
        public int hCandidateAcceptedMth  = 49;
        public int hCandidateAcceptedDay  = 50;
        public int hDissertationYear      = 51;
        public int hDissertationMth       = 52;
        public int hDissertationDay       = 53;
        public int hDoctorateGradYear     = 54;
        public int hDoctorateGradMth      = 55;
        public int hDoctorateGradDay      = 56;
        public int hDissertationTitle     = 64;
        public int hCurrentProgram        = 66;
        public int hJobCompany            = 67;
        public int hJobCity               = 68;
        public int hJobCompanyWeb         = 69;
        public int hJobTitle              = 70;
        public int hNetworkingQ1          = 71;
        public int hNetworkingQ2          = 72;
        public int hFurtherStudySchool    = 74;
        public int hCurrentLevel          = 76;
        
    }
    public class facultydataFields {
        public string Id                       = "";
        public string UserName                 = "";
        public string First_Name               = "";
        public string Last_Name                = "";
        public string Title                    = "";
        public string Office                   = "";
        public string Phone                    = "";
        public string Research_Int             = "";
        public string Designation              = "";
        public string Current                  = "";
        public string Email                    = "";
        public string Homepage                 = "";
        
    }
    public class facultydataFieldsFromCsv {
        public int hTotalNumberColumns = 11;
        public int hUserName     = 0;
        public int hFirstName    = 1;
        public int hLastName     = 2;
        public int hTitle        = 3;
        public int hOffice       = 4;
        public int hPhone        = 5;
        public int hResearch_Int = 6;
        public int hDesignation  = 7;
        public int hCurrent      = 8;
        public int hEmail        = 9;
        public int hHomepage     = 10;
    
    }

    public class importDataStatus {
        public int addcount    = 0;
        public int updatecount = 0;
        public int errorcount  = 0;
        public string status   = "";
    }

}