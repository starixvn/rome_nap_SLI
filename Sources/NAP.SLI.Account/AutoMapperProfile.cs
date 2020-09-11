namespace NAP.SLI.Account
{
    using AutoMapper;
    using NAP.SLI.Account.Criteria;
    using NAP.SLI.Account.Models;

    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<LoginCriteria, AuthenticationModel>();
        }
    }
}
