using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SIMS.API.Models;
using System.Linq;
namespace SIMS.API.Data
{
    public class ThesisProjectRepository : IThesisProjectRepository
    {
        private readonly DataContext _context;
        public ThesisProjectRepository(DataContext context)
        {
            _context = context;
        }

        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<ThesisProject> GetThesisProj(string studentName) 
        {
            var thesisproject = await _context.ThesisProjects.FirstOrDefaultAsync(n => n.studentName == studentName);

            return thesisproject;
        }

        public async Task<IEnumerable<ThesisProject>> GetThesisProject(string studentName) 
        {
            var thesisproject = await _context.ThesisProjects.Where(n => n.studentName == studentName).ToListAsync();

            return thesisproject;
        }

        public async Task<IEnumerable<ThesisProject>> GetThesisProjects()
        {
          return await _context.ThesisProjects.Where(d => d.docType != "Others").ToListAsync();
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
