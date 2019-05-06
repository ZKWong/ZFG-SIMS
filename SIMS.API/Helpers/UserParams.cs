namespace SIMS.API.Helpers
{
    public class UserParams
    {
        private const int MaxPageSize = 50;
        public int PageNumber { get; set; } = 1;
        private int pageSize = 10;
        public int PageSize
        {
            get { return pageSize;}
            set { pageSize = (value > MaxPageSize) ? MaxPageSize : value;}
        }
        public int UserId { get; set; }
        public string Role { get; set; }
        public string SearchBy { get; set; }
        public string SearchByInput { get; set; }
        public string OrderBy { get; set; }
        

    }
}