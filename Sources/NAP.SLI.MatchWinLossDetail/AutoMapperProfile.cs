namespace NAP.SLI.MatchWinLossDetail
{
    using AutoMapper;
    using NAP.SLI.Common.Services;
    using NAP.SLI.MatchWinLossDetail.Models;
    using NAP.SLI.MatchWinLossDetail.Requests;

    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<ExcelRequest, QueryRequest>();
            CreateMap<AgentRecord, AgentRecordEx>().AfterMap<AgentRecordExMappingAction>();
            CreateMap<MasterRecord, MasterRecordEx>().AfterMap<MasterRecordExMappingAction>();
            CreateMap<SuperRecord, SuperRecordEx>().AfterMap<SuperRecordExMappingAction>();
        }
    }

    public abstract class RecordExMappingAction<S, D> : IMappingAction<S, D>
    where S : IRecord
    where D : IRecordEx<D>
    {
        private readonly IReportService reportService;

        public RecordExMappingAction(IReportService reportService)
        {
            this.reportService = reportService;
        }

        public void Process(S source, D destination, ResolutionContext context)
        {
            destination.BetTypeName = reportService.GetBetTypeName(source.BetType);
            CalculateCompanyWinLoss(source, destination);
        }

        public abstract void CalculateCompanyWinLoss(S source, D destination);
    }

    public class AgentRecordExMappingAction : RecordExMappingAction<AgentRecord, AgentRecordEx>
    {
        public AgentRecordExMappingAction(IReportService reportService)
        : base(reportService)
        {
        }

        public override void CalculateCompanyWinLoss(AgentRecord source, AgentRecordEx destination)
        {
            destination.CompanyWinLoss = -(source.MemberWinLoss + source.AgentWinLoss);
        }
    }

    public class MasterRecordExMappingAction : RecordExMappingAction<MasterRecord, MasterRecordEx>
    {
        public MasterRecordExMappingAction(IReportService reportService)
        : base(reportService)
        {
        }

        public override void CalculateCompanyWinLoss(MasterRecord source, MasterRecordEx destination)
        {
            destination.CompanyWinLoss = -(source.MemberWinLoss + source.AgentWinLoss + source.MasterWinLoss);
        }
    }

    public class SuperRecordExMappingAction : RecordExMappingAction<SuperRecord, SuperRecordEx>
    {
        public SuperRecordExMappingAction(IReportService reportService)
        : base(reportService)
        {
        }

        public override void CalculateCompanyWinLoss(SuperRecord source, SuperRecordEx destination)
        {
            destination.CompanyWinLoss = -(source.MemberWinLoss + source.AgentWinLoss + source.MasterWinLoss + source.SuperWinLoss);
        }
    }
}
