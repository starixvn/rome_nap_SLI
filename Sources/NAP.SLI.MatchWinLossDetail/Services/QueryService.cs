using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Fanex.Data.Repository;
using Fanex.RemotingRef;
using NAP.SLI.Common.Services;
using NAP.SLI.MatchWinLossDetail.Constants;
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
            var recordExs = mapper.Map<IEnumerable<SuperRecord>, IEnumerable<SuperRecordEx>>(records);
            var (numberGameAndHappy5Records, happy5LinkedGameRecords) = SplitRecordsByBettype<SuperRecordEx>(recordExs);
            return new SuperData(Build<SuperRecordEx, MatchData<SuperRecordEx>>(numberGameAndHappy5Records), happy5LinkedGameRecords);
        }

        public async Task<MasterData> QueryMaster(QueryRequest request)
        {
            var records = await Query<MasterRecord>(request).ConfigureAwait(false);
            var recordExs = mapper.Map<IEnumerable<MasterRecord>, IEnumerable<MasterRecordEx>>(records);
            var (numberGameAndHappy5Records, happy5LinkedGameRecords) = SplitRecordsByBettype<MasterRecordEx>(recordExs);
            return new MasterData(Build<MasterRecordEx, MatchData<MasterRecordEx>>(numberGameAndHappy5Records), happy5LinkedGameRecords);
        }

        public async Task<AgentData> QueryAgent(QueryRequest request)
        {
            var records = await Query<AgentRecord>(request).ConfigureAwait(false);
            var recordExs = mapper.Map<IEnumerable<AgentRecord>, IEnumerable<AgentRecordEx>>(records);
            var (numberGameAndHappy5Records, happy5LinkedGameRecords) = SplitRecordsByBettype<AgentRecordEx>(recordExs);
            return new AgentData(Build<AgentRecordEx, MatchData<AgentRecordEx>>(numberGameAndHappy5Records), happy5LinkedGameRecords);
        }

        private IEnumerable<K> Build<T, K>(IEnumerable<T> records)
        where T : IRecordEx<T>, new()
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

        private static (IEnumerable<T>, IEnumerable<T>) SplitRecordsByBettype<T>(IEnumerable<T> records) where T : IRecordEx<T>, new()
        {
            var numberGameAndHappy5Records = records.Where(record => !IsHappy5LinkedGame(record.BetType));
            var happy5LinkedGameRecords = records.Where(record => IsHappy5LinkedGame(record.BetType));
            return (numberGameAndHappy5Records, happy5LinkedGameRecords);
        }

        private static bool IsHappy5LinkedGame(int betType) => (BetTypeIdConstants.Happy5LinkedGamesMin <= betType && betType <= BetTypeIdConstants.Happy5LinkedGamesMax);

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