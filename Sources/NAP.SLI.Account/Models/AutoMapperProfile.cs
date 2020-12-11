namespace NAP.SLI.Account.Models
{
    using AutoMapper;
    using NAP.SLI.Account.Criteria;

    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<LoginCriteria, AuthenticationModel>();
        }
    }
}
