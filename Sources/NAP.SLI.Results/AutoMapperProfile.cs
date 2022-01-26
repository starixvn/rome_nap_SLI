namespace NAP.SLI.Results
{
    using AutoMapper;
    using NAP.SLI.Results.Requests;

    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<ExcelRequest, QueryResultsByDateRequest>();
        }
    }
}