using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Fanex.Data.Repository;
using Fanex.RemotingRef;
using NAP.SLI.Common.Services;
using NAP.SLI.MatchWinLossDetail.Criteria;
using NAP.SLI.MatchWinLossDetail.Models;
using NAP.SLI.MatchWinLossDetail.Requests;

namespace NAP.SLI.MatchWinLossDetail.Services
{
    public interface IQueryService
    {
        Task<SuperData> QuerySuper(QueryRequest request);

        Task<MasterData> QueryMaster(QueryRequest request);

        Task<AgentData> QueryAgent(QueryRequest request);
    }

    public class QueryService : IQueryService
    {
        private readonly IReportService reportService;
        private readonly IDynamicRepository dynamicRepository;
        private readonly IRemotingRefService remotingRefService;
        private readonly ICurrentContextService currentContextService;
        private readonly IMapper mapper;

        public QueryService(IReportService reportService, IDynamicRepository dynamicRepository, IRemotingRefService remotingRefService, ICurrentContextService currentContextService, IMapper mapper)
            => (this.reportService, this.dynamicRepository, this.remotingRefService, this.currentContextService, this.mapper) = (reportService, dynamicRepository, remotingRefService, currentContextService, mapper);

        public async Task<SuperData> QuerySuper(QueryRequest request)
        {
            var records = await Query<SuperRecord>(request).ConfigureAwait(false);
            var records2 = mapper.Map<IEnumerable<SuperRecord>, IEnumerable<SuperRecord2>>(records);
            return new SuperData
            {
                Data = Build(records2)
            };
        }

        public async Task<MasterData> QueryMaster(QueryRequest request)
        {
            var records = await Query<MasterRecord>(request).ConfigureAwait(false);
            var records2 = mapper.Map<IEnumerable<MasterRecord>, IEnumerable<MasterRecord2>>(records);
            return new MasterData
            {
                Data = Build(records2)
            };
        }

        public async Task<AgentData> QueryAgent(QueryRequest request)
        {
            var records = await Query<AgentRecord>(request).ConfigureAwait(false);
            var records2 = mapper.Map<IEnumerable<AgentRecord>, IEnumerable<AgentRecord2>>(records);
            return new AgentData
            {
                Data = Build(records2)
            };
        }

        private IEnumerable<Data<T>> Build<T>(IEnumerable<T> records) where T : AgentRecord
        {
            var languageCode = currentContextService.GetLanguageCode();
            return records.GroupBy(r => new
            {
                r.LeagueId,
                r.MatchId
            }).Select(gcs => new Data<T>
            {
                LeagueName = remotingRefService.GetLeagueName3rd(gcs.Key.LeagueId.ToString(), languageCode),
                MatchName = $"No {gcs.Key.MatchId}",
                Records = gcs
            });
        }

        private async Task<IEnumerable<T>> Query<T>(QueryRequest request)
        {
            var balanceUpDayModel = await reportService.GetBalanceUpDay().ConfigureAwait(false);
            var criteria = new QueryCriteria(balanceUpDayModel)
            {
                CustId = request.CustId,
                RoleId = request.RoleId,
                FromDate = request.FromDate,
                ToDate = request.ToDate
            };
            return await dynamicRepository.FetchAsync<T>(criteria).ConfigureAwait(false);
        }
    }
}