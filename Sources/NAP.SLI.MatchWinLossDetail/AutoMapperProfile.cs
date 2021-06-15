namespace NAP.SLI.MatchWinLossDetail
{
    using AutoMapper;
    using Fanex.RemotingRef;
    using NAP.SLI.Common.Services;
    using NAP.SLI.MatchWinLossDetail.Models;
    using NAP.SLI.MatchWinLossDetail.Requests;

    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<ExcelRequest, QueryRequest>();
            CreateMap<AgentRecord, AgentRecord2>().AfterMap<SetBetTypeNameAgentRecordMappingAction>();
            CreateMap<MasterRecord, MasterRecord2>().AfterMap<SetBetTypeNameMasterRecordMappingAction>();
            CreateMap<SuperRecord, SuperRecord2>().AfterMap<SetBetTypeNameSuperRecordMappingAction>();
        }
    }

    public class SetBetTypeNameMappingAction<S, D> : IMappingAction<S, D>
    where S : AgentRecord
    where D : IBetTypeNameRecord
    {
        private readonly IRemotingRefService remotingRefService;
        private readonly ICurrentContextService currentContextService;

        public SetBetTypeNameMappingAction(IRemotingRefService remotingRefService, ICurrentContextService currentContextService)
        {
            this.remotingRefService = remotingRefService;
            this.currentContextService = currentContextService;
        }

        public void Process(S source, D destination, ResolutionContext context)
        {
            var languageCode = currentContextService.GetLanguageCode();
            destination.BetTypeName = remotingRefService.GetBetTypeName(source.BetType.ToString(), languageCode);
        }
    }

    public class SetBetTypeNameAgentRecordMappingAction : SetBetTypeNameMappingAction<AgentRecord, AgentRecord2>
    {
        public SetBetTypeNameAgentRecordMappingAction(IRemotingRefService remotingRefService, ICurrentContextService currentContextService)
        : base(remotingRefService, currentContextService)
        {
        }
    }

    public class SetBetTypeNameMasterRecordMappingAction : SetBetTypeNameMappingAction<MasterRecord, MasterRecord2>
    {
        public SetBetTypeNameMasterRecordMappingAction(IRemotingRefService remotingRefService, ICurrentContextService currentContextService)
        : base(remotingRefService, currentContextService)
        {
        }
    }

    public class SetBetTypeNameSuperRecordMappingAction : SetBetTypeNameMappingAction<SuperRecord, SuperRecord2>
    {
        public SetBetTypeNameSuperRecordMappingAction(IRemotingRefService remotingRefService, ICurrentContextService currentContextService)
        : base(remotingRefService, currentContextService)
        {
        }
    }
}
