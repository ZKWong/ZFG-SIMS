using System.Collections.Generic;
using System.Threading.Tasks;
using SIMS.API.Models;
namespace SIMS.API.Data
{
    public interface IThesisProjectRepository
    {
        void Add<T>(T entity) where T: class;
        void Delete<T>(T entity) where T: class;

        Task<ThesisProject> GetThesisProj(string studentName);
        Task<IEnumerable<ThesisProject>> GetThesisProject(string studentName);
        Task<IEnumerable<ThesisProject>> GetThesisProjects();
        Task<bool> SaveAll();
    }
}