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
    public class ThesisProjectsController : ControllerBase
    {
        private readonly IThesisProjectRepository _thesisRepo;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;

        public ThesisProjectsController(IThesisProjectRepository thesisRepo ,IMapper mapper,IConfiguration Configuration)
        {
            _thesisRepo = thesisRepo;
            _mapper = mapper;
            _configuration = Configuration;
        }

        [AllowAnonymous]
        [HttpPost("UpdateThesisProject")]
        public async Task<IActionResult> UpdateThesisProject([FromBody] dynamic thesisContent)
        {
            ThesisProject thesisProject = new ThesisProject();
            foreach (JProperty fld in thesisContent)
            {
                switch(fld.Name.ToLower()){
                    case "studentname":
                      thesisProject.studentName = (string)fld.Value;
                      break;
                    case "doctype":
                      thesisProject.docType = (string)fld.Value;
                      break;
                    case "topic":
                      thesisProject.topic = (string)fld.Value;
                      break;
                    case "filename":
                      thesisProject.fileName = (string)fld.Value;
                      break;
                    case "url":
                      thesisProject.url = (string)fld.Value;
                      break;
                    default:
                      break;
                }
            }
           
            Console.WriteLine("thesisproject: " , thesisProject);
            
            _thesisRepo.Add(thesisProject);
            if ( await _thesisRepo.SaveAll()) {
                return NoContent();
            } else {
                return BadRequest("Update ThesisProject Failed");
            }
            //return null;
        }

        [AllowAnonymous]
        [HttpPost("UploadFile/{studentName}/{fileName}/{docType}/{topic}")]
        public async Task<IActionResult> UploadFile(string studentName,string fileName,string docType,
                                                    string topic,[FromForm]FileForCreationDto objFile)
        {
            Console.WriteLine("studentName: " + studentName);
            Console.WriteLine("fileName: " + fileName);
            var file        = objFile.File;
            // wwwroot is hardcoded
            string wwwroot  = "C:\\Users\\user\\Desktop\\SIU_CS499\\SIMS-4-07-course\\SIMS-master\\SIMS.API\\wwwroot\\";
            string FilePath = wwwroot + @"repo\documents\students\" + studentName;
            string FileN    = DateTime.Now.ToString("yyyyMMddHHmmss") + "_" + UniqueKey.GetUniqueKey(16)  + "_" + fileName;

            if (file.Length > 0)
            {
                if (!Directory.Exists(FilePath)) { Directory.CreateDirectory(FilePath); }
                ThesisProject thesisProject = new ThesisProject();
                thesisProject.url = FilePath + @"\" + FileN;
                var sf1  = new FileStream(thesisProject.url, FileMode.Create);
                await file.CopyToAsync(sf1);        
                sf1.Close();
                sf1.Dispose();
                
                thesisProject.studentName = studentName;
                thesisProject.topic       = topic;
                thesisProject.fileName    = fileName;
                thesisProject.docType     = docType;
                thesisProject.url         = "repo/documents/students/" + studentName + "/" + FileN;

                var thesisproj = await _thesisRepo.GetThesisProj(studentName);
                if((thesisproj != null) && (docType != "Others")) {
                    thesisProject.Id = thesisproj.Id;
                    if (UpdateThesisProjectTable(thesisProject)==1) {
                        return Ok("File Uploaded updated");
                    } else {
                        return BadRequest("Update ThesisProject Failed");
                    }
                } else {
                    _thesisRepo.Add(thesisProject);
                     if ( await _thesisRepo.SaveAll()) {
                        return Ok("File Uploaded");
                    } else {
                        return BadRequest("Upload ThesisProject Failed");
                    }
                }

            }
            return BadRequest("Could not add the file");
        }


        [AllowAnonymous]
        [HttpGet("GetThesisProjects")]
        public async Task<IActionResult> GetThesisProjects()
        {
            var thesisProjects = await _thesisRepo.GetThesisProjects();
            return Ok(thesisProjects);
        }

        [AllowAnonymous]
        [HttpGet("GetThesisProject/{studentName}")]
        public async Task<IActionResult> GetThesisProject(string studentName)
        {
            var thesisproj = await _thesisRepo.GetThesisProject(studentName);
            return Ok(thesisproj);
        }

        [AllowAnonymous]
        [HttpGet("GetStudents")]
        public async Task<IActionResult> GetStudents() {
            string env=Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
            string connstr = "Driver={SQLite3 ODBC Driver};Database=SIMS.db; Version=3";
            if (env == "Production") {connstr = "Driver={MySQL ODBC 8.0 Unicode Driver};Server=localhost;Database=SIMS;User=root;Password=P@ssw0rd; Option=3;";}
            OdbcConnection cnn;
            OdbcCommand cmd1;
            string sxql = "select UserName " +
                          "from AspNetUsers u " + 
                          "left join AspNetUserRoles r on u.id=r.userid " +
                          "where r.roleid=5 " +
                          "order by u.UserName";
            cnn = new OdbcConnection(connstr);
            cmd1=new OdbcCommand(sxql, cnn);
            OdbcDataReader reader1;
            string sb = "";
            string studentName = "";
            int hCount=0;
            try {
                cnn.Open();
                reader1=cmd1.ExecuteReader();
                while ( reader1.Read() ) {
                    hCount++;
                    studentName = reader1["UserName"].ToString();
                    if (sb == "") {
                        sb = "[{\"UserName\":\"" + studentName + "\"}";
                    } else {
                        sb = sb + ",{\"UserName\":\"" + studentName + "\"}";
                    }
                }
                cnn.Close();
                Console.WriteLine("hCount: " + hCount);
            } catch ( Exception e) {
                Console.WriteLine("error in getting students");
                Console.WriteLine(e);
            }
            sb = sb + "]";
            return Ok(sb);
        }

        [AllowAnonymous]
        [HttpGet("DeleteThesisProject/{Id}")]
        public async Task<IActionResult> DeleteThesisProject(string Id) {
            string env=Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
            string connstr = _configuration.GetConnectionString("ODBC_DSN");
            OdbcConnection cnn;
            OdbcCommand    cmd1;
            string sxql = "delete from thesisprojects where Id=" + Id;
            cnn = new OdbcConnection(connstr);
            cmd1=new OdbcCommand(sxql, cnn);
            OdbcDataReader reader1;
            try {
                cnn.Open();
                reader1=cmd1.ExecuteReader();
                cnn.Close();
                return Ok();
            } catch ( Exception e) {
                Console.WriteLine(e);
            }
            return BadRequest("ThesisProject Delete failed");
        }

        public int UpdateThesisProjectTable(ThesisProject thesisProj) {
            string connstr = _configuration.GetConnectionString("ODBC_DSN");
            OdbcConnection cnn;
            OdbcCommand    cmd1;
            string sxql = "update thesisprojects set studentName='"+thesisProj.studentName+"'," + 
                          "docType='"+thesisProj.docType+"',topic='"+thesisProj.topic+"'," +
                          "fileName='"+thesisProj.fileName+"',url='"+thesisProj.url+"' " +
                          "where Id=" + thesisProj.Id;
            cnn = new OdbcConnection(connstr);
            cmd1=new OdbcCommand(sxql, cnn);
            OdbcDataReader reader1;
            try {
                cnn.Open();
                reader1=cmd1.ExecuteReader();
                cnn.Close();
                return 1;
            } catch ( Exception e) {
                Console.WriteLine(e);
            }
            return 0;
        }

    }    
}
