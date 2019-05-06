using System.ComponentModel.DataAnnotations;

namespace SIMS.API.Models
{
    public class Course
    {
        [Key]
        public int uuid { get; set; }
        public string courseTitle { get; set; }
        public string courseNum { get; set; }
        public int section { get; set; }
        public string scheduleStartTime { get; set; }
        public string scheduleEndTime { get; set; }
        public string instructor { get; set; }
        public string room { get; set; }
        public int creditHours { get; set; }
        public string crn { get; set; }
        public int MaxStudent { get; set; }
        public string notes { get; set; }
        public string weekday { get; set; }
        public int scheduleType { get; set; }
        public int semesterId { get; set; }

    }
} 