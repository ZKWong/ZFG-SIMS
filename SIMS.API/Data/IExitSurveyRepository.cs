using System.Collections.Generic;
using System.Threading.Tasks;
using SIMS.API.Models;
namespace SIMS.API.Data
{
    public interface IExitSurveyRepository
    {
        void Add<T>(T entity) where T: class;
        void Delete<T>(T entity) where T: class;

        Task<ExitSurvey> GetExitSurvey(string ssId);
        Task<IEnumerable<ExitSurvey>> GetExitSurveys();
        Task<bool> SaveAll();
    }
}
