using AutoMapper;
using Datting.api.Dtos;
using Datting.api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace Datting.api.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForListDto>().ForMember(dest => dest.PhotoUrl, opt =>
                                                                               opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url))
                                              .ForMember(dest => dest.Age, opt =>
                                                                           opt.MapFrom(src => src.DateOdBirth.CalculateAge()));


            CreateMap<User, UserForDetailedDto>().ForMember(dest => dest.PhotoUrl, opt =>
                                                                                    opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url))
                                                 .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.DateOdBirth.CalculateAge()));
            CreateMap<Photo, PhotosForDetailDto>();
        }
    }
}
