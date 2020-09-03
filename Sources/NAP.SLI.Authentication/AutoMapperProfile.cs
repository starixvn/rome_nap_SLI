namespace NAP.SLI.Authentication
{
    using AutoMapper;
    using NAP.SLI.Authentication.Criteria;
    using NAP.SLI.Authentication.Models;

    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<LoginCriteria, LoginResult>();
        }
    }
}
