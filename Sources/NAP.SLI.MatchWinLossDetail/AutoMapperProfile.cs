namespace NAP.SLI.MatchWinLossDetail
{
    using AutoMapper;
    using NAP.SLI.MatchWinLossDetail.Requests;

    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<ExcelRequest, QueryRequest>();
        }
    }
}
