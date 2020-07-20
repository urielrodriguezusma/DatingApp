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

            CreateMap<UserForUpdateDto, User>();
            CreateMap<Photo, PhotoForReturnDto>();
            CreateMap<PhotoForCreationDto, Photo>();
            CreateMap<UserForRegisterDto, User>();
            CreateMap<MessageForCreationDto, Message>().ReverseMap();
            CreateMap<Message, MessageToReturnDto>()
                     .ForMember(m => m.SenderPhotoUrl, opt => opt.MapFrom(u => u.Sender.Photos.FirstOrDefault(p => p.IsMain).Url))
                     .ForMember(m => m.RecipientPhotoUrl, opt => opt.MapFrom(u => u.Recipient.Photos.FirstOrDefault(p => p.IsMain).Url));
        
        
        }
    }
}
