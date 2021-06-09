namespace NAP.SLI.Common
{
    using AutoMapper;
    using NAP.SLI.Common.Models;
    using NAP.SLI.Common.Services;

    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<AppSettings, ConfigurationModel>();
        }
    }
}
