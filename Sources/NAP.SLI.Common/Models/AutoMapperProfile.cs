namespace NAP.SLI.Common.Models
{
    using AutoMapper;
    using NAP.SLI.Common.Services;

    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<AppSettings, ConfigurationModel>();
        }
    }
}
