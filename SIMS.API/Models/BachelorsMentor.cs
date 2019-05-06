namespace SIMS.API.Models
{
    public class BachelorsMentor
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User User { get; set;}
        public string MentorName { get; set; }
    }
} 