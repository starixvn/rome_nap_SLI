using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

        public QueryService(IReportService reportService, IDynamicRepository dynamicRepository, IRemotingRefService remotingRefService, ICurrentContextService currentContextService)
            => (this.reportService, this.dynamicRepository, this.remotingRefService, this.currentContextService) = (reportService, dynamicRepository, remotingRefService, currentContextService);

        public async Task<SuperData> QuerySuper(QueryRequest request)
        {
            var records = await Query<SuperRecord>(request).ConfigureAwait(false);
            return new SuperData
            {
                Records = records,
                Names = GetNames(records)
            };
        }

        public async Task<MasterData> QueryMaster(QueryRequest request)
        {
            var records = await Query<MasterRecord>(request).ConfigureAwait(false);
            return new MasterData
            {
                Records = records,
                Names = GetNames(records)
            };
        }

        public async Task<AgentData> QueryAgent(QueryRequest request)
        {
            var records = await Query<AgentRecord>(request).ConfigureAwait(false);
            return new AgentData
            {
                Records = records,
                Names = GetNames(records)
            };
        }

        private NameData GetNames(IEnumerable<AgentRecord> records)
        {
            var languageCode = currentContextService.GetLanguageCode();
            var sportTypes = records.Select(x => x.SportType).Distinct().Select(x => KeyValuePair.Create(x, remotingRefService.GetSportName(x.ToString(), languageCode)));
            var teams = records.Select(x => x.HomeId).Union(records.Select(x => x.AwayId)).Select(x => KeyValuePair.Create(x, remotingRefService.GetTeamName3rd(x.ToString(), languageCode)));
            var leagues = records.Select(x => x.LeagueId).Distinct().Select(x => KeyValuePair.Create(x, remotingRefService.GetLeagueName(x.ToString(), languageCode)));
            var betTypes = records.Select(x => x.BetType).Distinct().Select(x => KeyValuePair.Create(x, remotingRefService.GetBetTypeName(x.ToString(), languageCode)));
            return new NameData
            {
                SportTypes = sportTypes,
                Teams = teams,
                Leagues = leagues,
                BetTypes = betTypes
            };
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