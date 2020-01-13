namespace NAP.SLI.Authentication
{
    using AutoMapper;
    using NAP.SLI.Authentication.Criteria;
    using NAP.SLI.Authentication.Models;

    public class AuthenticationProfile : Profile
    {
        public AuthenticationProfile()
        {
            CreateMap<LoginCriteria, LoginResult>();
        }
    }
}
