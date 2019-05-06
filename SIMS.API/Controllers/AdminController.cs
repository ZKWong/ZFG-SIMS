using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SIMS.API.Data;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using SIMS.API.Dtos;
using Microsoft.AspNetCore.Identity;
using SIMS.API.Models;

namespace SIMS.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly DataContext context;
        private readonly UserManager<User> userManager;
        public AdminController(DataContext context, UserManager<User> userManager)
        {
            this.userManager = userManager;
            this.context = context;
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpGet("usersWithRoles")]
        public async Task<IActionResult> GetUsersWithRoles()
        {
            var userList = await (from user in this.context.Users
                                  orderby user.UserName
                                  select new
                                  {
                                      Id = user.Id,
                                      UserName = user.UserName,
                                      Roles = (from userRole in user.UserRoles
                                               join role in this.context.Roles
                                               on userRole.RoleId
                                               equals role.Id
                                               select role.Name).ToList()
                                  }).ToListAsync();
            return Ok(userList);
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpPost("editRoles/{userName}")]
        public async Task<IActionResult> EditRoles(string userName, RoleEditDto roleEditDto)
        {
            var user = await this.userManager.FindByNameAsync(userName);

            var userRoles = await this.userManager.GetRolesAsync(user);

            var selectedRoles = roleEditDto.RoleNames;

            selectedRoles = selectedRoles ?? new string[] {};
            var result = await this.userManager.AddToRolesAsync(user, selectedRoles.Except(userRoles));

            if (!result.Succeeded)
            {
                return BadRequest("Failed to add to roles");
            }

            result = await this.userManager.RemoveFromRolesAsync(user, userRoles.Except(selectedRoles));

            if (!result.Succeeded)
            {
                return BadRequest("Failed to remove the roles");
            }

            return Ok(await this.userManager.GetRolesAsync(user));

        }

        //[Authorize(Policy = "ModeratePhotoRole")]
        [HttpGet("photosForModeration")]
        public IActionResult GetPhotosForModeration()
        {
            return Ok("Admin or moderators can see this");
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpPost("deleteUser")]
        public async Task<IActionResult> deleteUser(UserForDeleteDto userForDeleteDto)
        {
            var user = await this.userManager.FindByNameAsync(userForDeleteDto.Username);
            var result = await this.userManager.DeleteAsync(user);
            if (!result.Succeeded) {
                return BadRequest("User could not be deleted");
            }
            return Ok();
        }
    }
}