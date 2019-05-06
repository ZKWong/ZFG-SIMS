using System;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
// using CloudinaryDotNet;
// using CloudinaryDotNet.Actions;
using SIMS.API.Data;
using SIMS.API.Dtos;
using SIMS.API.Helpers;
using SIMS.API.Models;
using SIMS.API.Properties;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Microsoft.Extensions.Configuration;

namespace SIMS.API.Controllers
{
    [Authorize]
    [Route("api/users/{userId}/photos")]
    [ApiController]
    public class PhotosController : ControllerBase
    {
        private readonly ISimsRepository _repo;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;
        //private readonly IAdminSettingRepository _adminSettingRepo;



        // private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        // private Cloudinary _cloudinary;

        // public PhotosController(ISisRepository repo, IMapper mapper,
        //    IOptions<CloudinarySettings> cloudinaryConfig)
        public PhotosController(ISimsRepository repo, IMapper mapper, IConfiguration configuration)
        {
            // _cloudinaryConfig = cloudinaryConfig;
            _mapper = mapper;
            //_adminSettingRepo = adminSettingRepo;
            _repo = repo;
            _configuration = configuration;

            /* 
            Account acc = new Account(
                _cloudinaryConfig.Value.CloudName,
                _cloudinaryConfig.Value.ApiKey,
                _cloudinaryConfig.Value.ApiSecret
            );
            _cloudinary = new Cloudinary(acc); */
        }


        [HttpGet("{id}", Name = "GetPhoto")]
        public async Task<IActionResult> GetPhoto(int id)
        {
            var photoFromRepo = await _repo.GetPhoto(id);
            var photo         = _mapper.Map<PhotoForReturnDto>(photoFromRepo);
            return Ok(photo);
        } 

        [HttpPost]
        public async Task<IActionResult> AddPhotoForUser(int userId,
            [FromForm]PhotoForCreationDto photoForCreationDto)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var userFromRepo = await _repo.GetUser(userId);

            var file = photoForCreationDto.File;

            string urlroot  = _configuration.GetConnectionString("url_root");
            string wwwroot  = _configuration.GetConnectionString("wwwroot");
            if (!Directory.Exists(wwwroot)) { Directory.CreateDirectory(wwwroot); }
            string FilePath = wwwroot + @"repo\documents\photos\" + userId + "_" + userFromRepo.UserName;
            string FileName = DateTime.Now.ToString("yyyyMMddHHmmss") + "_" + UniqueKey.GetUniqueKey(16)  + ".jpg";

            if (file.Length > 0)
            {
                if (!Directory.Exists(FilePath)) { Directory.CreateDirectory(FilePath); }
                FilePath = FilePath + @"\" + FileName;
                var sf1 = new FileStream(FilePath, FileMode.Create);
                    await file.CopyToAsync(sf1);        
                    sf1.Close();
                    sf1.Dispose();
            }

            // photoForCreationDto.Url = uploadResult.Uri.ToString();
            photoForCreationDto.Url = urlroot+"repo/documents/photos/" + userId + "_" + userFromRepo.UserName + "/" + FileName;

            var photo = _mapper.Map<Photo>(photoForCreationDto);

            if (!userFromRepo.Photos.Any(u => u.IsMain))
                photo.IsMain = true;

            userFromRepo.Photos.Add(photo);

            if (await _repo.SaveAll())
            {
                var photoToReturn = _mapper.Map<PhotoForReturnDto>(photo);
                return CreatedAtRoute("GetPhoto", new { id = photo.Id }, photoToReturn);
            }

            return BadRequest("Could not add the photo");
        }


        [HttpPost("{id}/setMain")]
        public async Task<IActionResult> SetMainPhoto(int userId, int id)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var user = await _repo.GetUser(userId);

            if (!user.Photos.Any(p => p.Id == id))
                return Unauthorized();

            var photoFromRepo = await _repo.GetPhoto(id);

            if (photoFromRepo.IsMain)
                return BadRequest("This is already the main photo");

            var currentMainPhoto = await _repo.GetMainPhotoForUser(userId);
            currentMainPhoto.IsMain = false;

            photoFromRepo.IsMain = true;

            if (await _repo.SaveAll())
                return NoContent();

            return BadRequest("Could not set photo to main");
        } 


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePhoto(int userId, int id)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var user = await _repo.GetUser(userId);

            if (!user.Photos.Any(p => p.Id == id))
                return Unauthorized();

            var photoFromRepo = await _repo.GetPhoto(id);

            if (photoFromRepo.IsMain)
                return BadRequest("You cannot delete your main photo");

            int hResult = 1;

            var userFromRepo = await _repo.GetUser(userId);
            //var adminSettingJson = _adminSettingRepo.GetAdminSetting("wwwRoot");
            string wwwroot  = _configuration.GetConnectionString("wwwroot");
            if (!Directory.Exists(wwwroot)) { Directory.CreateDirectory(wwwroot); }
            string xUrl     = photoFromRepo.Url;
            xUrl.Replace('/', '\\');
            //string FilePath = wwwroot + @"repo\documents\photos\" + userId + "_" + userFromRepo.KnownAs;
            string FilePath = wwwroot + xUrl;
            Console.WriteLine(FilePath);
            //FilePath = FilePath + @"\" + photoFromRepo.PublicId;

            if (System.IO.File.Exists(FilePath)) {
                System.IO.File.Delete(FilePath);
            }

            if (hResult == 1)
            {
                _repo.Delete(photoFromRepo);
            }

            if (await _repo.SaveAll())
                return Ok();

            return BadRequest("Failed to delete the photo");
        }  

    } 
} 