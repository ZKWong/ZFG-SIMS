using System;
using System.Linq;
namespace SIMS.API.Models
{
    public class ThesisProject
    {
        public int Id { get; set;}
        public string studentName { get; set; }
        public string docType { get; set; }
        public string topic { get; set; }
        public string fileName { get; set; }
        public string url { get; set; }
    }
}