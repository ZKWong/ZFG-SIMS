using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;
using SIMS.API.Models;

namespace SIMS.API.Data
{
    public class Seed
    {
        private readonly UserManager<User> userManager;
        private readonly RoleManager<Role> roleManager;
        private readonly DataContext _context;
        public Seed(UserManager<User> userManager, RoleManager<Role> roleManager, DataContext context)
        {
            this.roleManager = roleManager;
            this.userManager = userManager;
            _context         = context;
        }

        public void SeedUsers()
        {
            if (!this.userManager.Users.Any())
            {
                var userData = System.IO.File.ReadAllText("Data/UserSeedData.json");
                var users = JsonConvert.DeserializeObject<List<User>>(userData);

                var roles = new List<Role>
                {
                    new Role{Name = "Admin"},
                    new Role{Name = "Staff"},
                    new Role{Name = "Faculty"},
                    new Role{Name = "Advisor"},
                    new Role{Name = "Student"}
                };

                foreach (var role in roles)
                {
                    this.roleManager.CreateAsync(role).Wait();
                }

                /* foreach (var user in users)
                {
                    this.userManager.CreateAsync(user, "password").Wait();
                    this.userManager.AddToRoleAsync(user, "Student").Wait();
                }*/

                var adminUser = new User
                {
                    UserName = "Admin"
                };

                IdentityResult result = this.userManager.CreateAsync(adminUser, "password").Result;

                if (result.Succeeded)
                {
                    var admin = this.userManager.FindByNameAsync("admin").Result;
                    this.userManager.AddToRolesAsync(admin, new[] {"Admin"}).Wait();
                }
            }
        }
        public void Seed_courses(){
            var coursesData = System.IO.File.ReadAllText("Data/coursesSeedData.json");
            var courses = JsonConvert.DeserializeObject<List<kourses>>(coursesData);
            foreach (var course in courses) 
            {
                _context.kourses.Add(course);
            }

            _context.SaveChanges();
        }
        public void Seed_courses_offer(){
            var courses_offerData = System.IO.File.ReadAllText("Data/courses_offerSeedData.json");
            var courses_offer = JsonConvert.DeserializeObject<List<courses_offer>>(courses_offerData);
            foreach (var course_offer in courses_offer) 
            {
                _context.courses_offer.Add(course_offer);
            }

            _context.SaveChanges();
        }
        public void Seed_day_hourly(){
            var day_hourlyData = System.IO.File.ReadAllText("Data/day_hourlySeedData.json");
            var days_hourly = JsonConvert.DeserializeObject<List<day_hourly>>(day_hourlyData);
            foreach (var hday_hourly in days_hourly) 
            {
                _context.day_hourly.Add(hday_hourly);
            }

            _context.SaveChanges();
        }
    }
}