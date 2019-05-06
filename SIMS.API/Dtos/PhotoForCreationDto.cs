using System;
using Microsoft.AspNetCore.Http;

namespace SIMS.API.Dtos
{
    public class PhotoForCreationDto
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public IFormFile File { get; set; }
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
        public bool IsMain { get; set; }
        public SIMS.API.Models.User User { get; set; }
        public int UserId { get; set; }


        public PhotoForCreationDto()
        {
            DateAdded = DateTime.Now;
        }
    }
} 