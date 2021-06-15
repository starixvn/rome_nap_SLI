using System;
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
            return new SuperData(Build<SuperRecord2, MatchData<SuperRecord2>>(records2));
        }

        public async Task<MasterData> QueryMaster(QueryRequest request)
        {
            var records = await Query<MasterRecord>(request).ConfigureAwait(false);
            var records2 = mapper.Map<IEnumerable<MasterRecord>, IEnumerable<MasterRecord2>>(records);
            return new MasterData(Build<MasterRecord2, MatchData<MasterRecord2>>(records2));
        }

        public async Task<AgentData> QueryAgent(QueryRequest request)
        {
            var records = await Query<AgentRecord>(request).ConfigureAwait(false);
            var records2 = mapper.Map<IEnumerable<AgentRecord>, IEnumerable<AgentRecord2>>(records);
            return new AgentData(Build<AgentRecord2, MatchData<AgentRecord2>>(records2));
        }

        private IEnumerable<K> Build<T, K>(IEnumerable<T> records)
        where T : IRecord, new()
        where K : MatchData<T>
        {
            var languageCode = currentContextService.GetLanguageCode();
            return records.GroupBy(r => new
            {
                r.LeagueId,
                r.MatchId
            }).Select(gcs =>
            {
                var leagueName = remotingRefService.GetLeagueName3rd(gcs.Key.LeagueId.ToString(), languageCode);
                var matchName = $"No {gcs.Key.MatchId}";
                var records = gcs;
                return (K)Activator.CreateInstance(typeof(K), new object[] { leagueName, matchName, records });
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