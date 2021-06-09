namespace NAP.SLI.WinLossAnalysis
{
    using AutoMapper;
    using NAP.SLI.WinLossAnalysis.Requests;

    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<ExcelRequest, QueryRequest>();
        }
    }
}
