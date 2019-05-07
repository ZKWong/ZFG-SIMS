using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SIMS.API.Models;

namespace SIMS.API.Data
{
    public class DataContext : IdentityDbContext<User, Role, int, IdentityUserClaim<int>, 
        UserRole, IdentityUserLogin<int>, IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public DataContext(DbContextOptions<DataContext> options) : base (options) {}
        public DbSet<Photo> Photos { get; set; }
        public DbSet<ExitSurvey> ExitSurveys { get; set; }
        public DbSet<GradSeniorSurvey> GradSeniorSurveys { get; set; }
        public DbSet<ThesisProject> ThesisProjects { get; set; }
        public DbSet<faculty> faculty { get; set; }
        public DbSet<BachelorsMentor> BachelorsMentor { get; set; }
        public DbSet<BachelorsProjectAdvisor> BachelorsProjectAdvisor { get; set; }
        public DbSet<BachelorsThesisAdvisor> BachelorsThesisAdvisor { get; set; }
        public DbSet<MastersProjectAdvisor> MastersProjectAdvisor { get; set; }
        public DbSet<MastersThesisAdvisor> MastersThesisAdvisor { get; set; }
        public DbSet<MastersCommittee> MastersCommittee { get; set; }
        public DbSet<DoctorateAdvisor> DoctorateAdvisor { get; set; }
        // public DbSet<ExternalAdvisor> ExternalAdvisors { get; set; }
        public DbSet<DoctorateCommittee> DoctorateCommittee { get; set; }
        public DbSet<Semester> Semesters  { get; set; }
        public DbSet<Course> Courses { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<UserRole>(userRole => 
            {
                userRole.HasKey(ur => new {ur.UserId, ur.RoleId});
                
                userRole.HasOne(ur => ur.Role)
                    .WithMany(r => r.UserRoles)
                    .HasForeignKey(ur => ur.RoleId)
                    .IsRequired();

                userRole.HasOne(ur => ur.User)
                    .WithMany(r => r.UserRoles)
                    .HasForeignKey(ur => ur.UserId)
                    .IsRequired();
            });
        }
        
    }
    
}
