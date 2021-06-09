namespace NAP.SLI.WinLossDetail
{
    using AutoMapper;
    using NAP.SLI.WinLossDetail.Requests;

    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<ExcelRequest, QueryRequest>();
        }
    }
}
