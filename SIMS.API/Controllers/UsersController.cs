using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SIMS.API.Data;
using SIMS.API.Dtos;
using SIMS.API.Helpers;
using SIMS.API.Models;

namespace SIMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ISimsRepository repo;
        private readonly IMapper mapper;
        private readonly UserManager<User> userManager;

        public UsersController(ISimsRepository repo, IMapper mapper, UserManager<User> userManager)
        {
            this.userManager = userManager;
            this.repo = repo;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers([FromQuery]UserParams userParams)
        {
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var userFromRepo = await this.repo.GetUser(currentUserId);
            userParams.UserId = currentUserId;
            if (string.IsNullOrEmpty(userParams.Role)) {
                userParams.Role = "Student";
            }
            Console.WriteLine("getusers:"+userParams.Role);

            var users = await repo.GetUsers(userParams);
            var usersToReturn = this.mapper.Map<IEnumerable<UserForListDto>>(users);

            Response.AddPagination(users.CurrentPage, users.PageSize, users.TotalCount, users.TotalPages);
            return Ok(usersToReturn);
        }

        [HttpGet("{id}", Name = "GetUser")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await this.repo.GetUser(id);
            var userToReturn = this.mapper.Map<UserForDetailedDto>(user);
            return Ok(userToReturn);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> updateUser(int id, UserForUpdateDto userForUpdateDto)
        {
            /* if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }
            var userFromRepo = await this.userManager.FindByIdAsync(id.ToString());
            this.mapper.Map(userForUpdateDto, userFromRepo); */

            // var userFromRepo = await this.repo.GetUser(id);
            Console.WriteLine(userForUpdateDto);
            var userFromRepo = await this.userManager.FindByIdAsync(id.ToString());
            this.mapper.Map(userForUpdateDto, userFromRepo); //capital u
            Console.WriteLine(userFromRepo);

            if (await this.repo.SaveAll())
            {
                return NoContent();
            }

            return NoContent();

            //throw new Exception($"Updating user {id} failed on save");

        }

    }
}