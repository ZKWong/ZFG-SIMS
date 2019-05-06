using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using SIMS.API.Data;
using SIMS.API.Dtos;
using SIMS.API.Models;
using Novell.Directory.Ldap;

namespace SIMS.API.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration config;
        private readonly IMapper mapper;
        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;
        public AuthController(IConfiguration config, IMapper mapper, UserManager<User> userManager, SignInManager<User> signInManager)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.config = config;
            this.mapper = mapper;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
        {
            var userToCreate = this.mapper.Map<User>(userForRegisterDto);

            var result = await this.userManager.CreateAsync(userToCreate, userForRegisterDto.Password);

            var userToReturn = this.mapper.Map<UserForDetailedDto>(userToCreate);

            if (result.Succeeded)
            {
                await this.userManager.AddToRoleAsync(userToCreate, "Student");
                return CreatedAtRoute("GetUser", new { controller = "Users", id = userToCreate.Id }, userToReturn); //throw code for now
            }

            return BadRequest(result.Errors);

        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto userForLoginDto)
        {
            var user = (User)null;
            var hProceed = 0;
            var result=(Microsoft.AspNetCore.Identity.SignInResult)null;
            if (LdapLoginOk(userForLoginDto)==1) {
                user = await this.userManager.FindByNameAsync(userForLoginDto.Username);
                //result = await this.signInManager.PreSignInCheck( user);
                result = new Microsoft.AspNetCore.Identity.SignInResult();
                //result.Success=true;
                hProceed=1;
            } else {
                user = await this.userManager.FindByNameAsync(userForLoginDto.Username);

                result = await this.signInManager.CheckPasswordSignInAsync(user, userForLoginDto.Password, false);
                if (result.Succeeded) hProceed=1;
            }

            if (user == null) {
                return Unauthorized();
            }
            

            if (hProceed==1)
            {
                var appUser = await this.userManager.Users.Include(p => p.Photos)
                    .FirstOrDefaultAsync(u => u.NormalizedUserName == userForLoginDto.Username.ToUpper());
                
                var userToReturn = this.mapper.Map<UserForListDto>(appUser);
                
                return Ok(new
                {
                    token = GenerateJwtToken(appUser).Result,
                    user = userToReturn
                });
            }

            return Unauthorized();
        }

        private async Task<string> GenerateJwtToken(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.UserName)
            };

            var roles = await this.userManager.GetRolesAsync(user);

            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(this.config.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
        public int LdapLoginOk(UserForLoginDto userForLoginDto) {
            LdapConnection ldapConn = new LdapConnection();
            int ldapVersion = LdapConnection.Ldap_V3;

            // Uncomment the following 5 lines when test with school ldap
            ldapConn.SecureSocketLayer=true;
            string ldapServer = "AD.SIU.EDU";
            int ldapPort =636;
            string ldapUserDN = "AD\\"+userForLoginDto.Username;
            string ldapPasswd = userForLoginDto.Password;

            // Comment out the following 4 lines when test with school ldap
            //string ldapServer = "ldap.forumsys.com";
            //int ldapPort =389;
            //string ldapUserDN = "uid="+userForLoginDto.Username+";dc=example;dc=com";
            //string ldapPasswd = userForLoginDto.Password;

            try {
                ldapConn.Connect(ldapServer, ldapPort);  
                ldapConn.Bind(ldapVersion, ldapUserDN, ldapPasswd);
                ldapConn.Disconnect();
                Console.WriteLine("LDAP Login OK");
                return 1;
            } catch ( LdapException e) {
                Console.WriteLine("Ldap Err: "+e.ToString());
            }catch ( Exception f ) {
                Console.WriteLine("Ldap Err2: "+f.ToString());
            }

            return 0;
        }
    }
}