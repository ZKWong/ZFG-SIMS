namespace SIMS.API.Models
{
    public class BachelorsThesisAdvisor
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public string AdvisorName { get; set; }
    }
}