namespace NAP.SLI.WinLossDetail
{
    using AutoMapper;
    using NAP.SLI.WinLossDetail.Models;
    using NAP.SLI.WinLossDetail.Requests;

    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<ExcelRequest, QueryRequest>();
            CreateMap<AgentRecord, AgentRecordEx>().AfterMap((src, dest) => dest.CompanyWinLoss = -(src.MemberWinLoss + src.AgentWinLoss));
            CreateMap<MasterRecord, MasterRecordEx>().AfterMap((src, dest) => dest.CompanyWinLoss = -(src.MemberWinLoss + src.AgentWinLoss + src.MasterWinLoss));
            CreateMap<SuperRecord, SuperRecordEx>().AfterMap((src, dest) => dest.CompanyWinLoss = -(src.MemberWinLoss + src.AgentWinLoss + src.MasterWinLoss + src.SuperWinLoss));
        }
    }
}
