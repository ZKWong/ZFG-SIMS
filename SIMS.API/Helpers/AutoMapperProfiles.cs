using System.Linq;
using AutoMapper;
using SIMS.API.Dtos;
using SIMS.API.Models;

namespace SIMS.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForListDto>().ForMember(dest => dest.PhotoUrl, opt => {
                opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
            })
            
            .ForMember(dest => dest.Age, opt => {
                opt.ResolveUsing(d => d.DateOfBirth.CalculateAge());
            });
            CreateMap<User, UserForDetailedDto>().ForMember(dest => dest.PhotoUrl, opt => {
                opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
            })
            .ForMember(dest => dest.BachelorsStartDate, opt =>
            {
                opt.MapFrom(src => src.BachelorsStartDate.ToShortDateString());
            })
            .ForMember(dest => dest.BachelorsGradDate, opt =>
            {
                opt.MapFrom(src => src.BachelorsGradDate.ToShortDateString());
            })
            .ForMember(dest => dest.MastersStartDate, opt =>
            {
                opt.MapFrom(src => src.MastersStartDate.ToShortDateString());
            })
            .ForMember(dest => dest.MastersCommFormDate, opt =>
            {
                opt.MapFrom(src => src.MastersCommFormedDate.ToShortDateString());
            }).ForMember(dest => dest.MastersDefenseDate, opt =>
            {
                opt.MapFrom(src => src.MastersDefenseDate.ToShortDateString());
            }).ForMember(dest => dest.MastersGradDate, opt =>
            {
                opt.MapFrom(src => src.MastersGradDate.ToShortDateString());
            }).ForMember(dest => dest.DoctorateStartDate, opt =>
            {
                opt.MapFrom(src => src.DoctorateStartDate.ToShortDateString());
            }).ForMember(dest => dest.DateAcceptedForCandidacy, opt =>
            {
                opt.MapFrom(src => src.DateAcceptedForCandidacy.ToShortDateString());
            }).ForMember(dest => dest.DoctorateCommFormDate, opt =>
            {
                opt.MapFrom(src => src.DoctorateCommFormDate.ToShortDateString());
            }).ForMember(dest => dest.DissertationDefenseDate, opt =>
            {
                opt.MapFrom(src => src.DissertationDefenseDate.ToShortDateString());
            }).ForMember(dest => dest.DoctorateGradDate, opt =>
            {
                opt.MapFrom(src => src.DoctorateGradDate.ToShortDateString());
            });
            /* .ForMember(dest => dest.Age, opt => {
                opt.ResolveUsing(d => d.DateOfBirth.CalculateAge());
            });*/
            CreateMap<Photo, PhotosForDetailedDto>();
            CreateMap<UserForUpdateDto, User>();
            CreateMap<UserForRegisterDto, User>();
            CreateMap<UserForDeleteDto, User>();
        }
    }
}