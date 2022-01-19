namespace NAP.SLI.WinLossByBetType
{
    using AutoMapper;
    using Fanex.RemotingRef;
    using NAP.SLI.Common.Services;
    using NAP.SLI.WinLossByBetType.Models;
    using NAP.SLI.WinLossByBetType.Requests;

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
    where S : RecordBase
    where D : IRecordEx<D>
    {
        private readonly IRemotingRefService remotingRefService;
        private readonly ICurrentContextService currentContextService;

        public RecordExMappingAction(IRemotingRefService remotingRefService, ICurrentContextService currentContextService)
        {
            this.remotingRefService = remotingRefService;
            this.currentContextService = currentContextService;
        }

        public void Process(S source, D destination, ResolutionContext context)
        {
            var languageCode = currentContextService.GetLanguageCode();
            destination.BetTypeName = remotingRefService.GetBetTypeName(source.BetType.ToString(), languageCode);
            CalculateCompanyWinLoss(source, destination);
        }

        public abstract void CalculateCompanyWinLoss(S source, D destination);
    }

    public class AgentRecordExMappingAction : RecordExMappingAction<AgentRecord, AgentRecordEx>
    {
        public AgentRecordExMappingAction(IRemotingRefService remotingRefService, ICurrentContextService currentContextService)
        : base(remotingRefService, currentContextService)
        {
        }

        public override void CalculateCompanyWinLoss(AgentRecord source, AgentRecordEx destination)
        {
            destination.CompanyWinLoss = -(source.MemberWinLoss + source.AgentWinLoss);
        }
    }

    public class MasterRecordExMappingAction : RecordExMappingAction<MasterRecord, MasterRecordEx>
    {
        public MasterRecordExMappingAction(IRemotingRefService remotingRefService, ICurrentContextService currentContextService)
        : base(remotingRefService, currentContextService)
        {
        }

        public override void CalculateCompanyWinLoss(MasterRecord source, MasterRecordEx destination)
        {
            destination.CompanyWinLoss = -(source.AgentTotal + source.MasterWinLoss);
        }
    }

    public class SuperRecordExMappingAction : RecordExMappingAction<SuperRecord, SuperRecordEx>
    {
        public SuperRecordExMappingAction(IRemotingRefService remotingRefService, ICurrentContextService currentContextService)
        : base(remotingRefService, currentContextService)
        {
        }

        public override void CalculateCompanyWinLoss(SuperRecord source, SuperRecordEx destination)
        {
            destination.CompanyWinLoss = -(source.MasterTotal + source.SuperWinLoss);
        }
    }
}
