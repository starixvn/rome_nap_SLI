using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Fanex.Data.Repository;
using NAP.SLI.Common.Services;
using NAP.SLI.Localization.Services;
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
        private readonly IMapper mapper;
        private readonly ISharedLocalizer sharedLocalizer;

        public QueryService(IReportService reportService, IDynamicRepository dynamicRepository, IMapper mapper, ISharedLocalizer sharedLocalizer)
            => (this.reportService, this.dynamicRepository, this.mapper, this.sharedLocalizer) = (reportService, dynamicRepository, mapper, sharedLocalizer);

        public async Task<SuperData> QuerySuper(QueryRequest request)
        {
            var records = await Query<SuperRecord>(request).ConfigureAwait(false);
            var recordExs = mapper.Map<IEnumerable<SuperRecord>, IEnumerable<SuperRecordEx>>(records);
            var (numberGameAndHappy5Records, happy5LinkedGameRecords) = SplitRecordsByBettype(recordExs);
            return new SuperData(Build<SuperRecordEx, MatchData<SuperRecordEx>>(numberGameAndHappy5Records), happy5LinkedGameRecords);
        }

        public async Task<MasterData> QueryMaster(QueryRequest request)
        {
            var records = await Query<MasterRecord>(request).ConfigureAwait(false);
            var recordExs = mapper.Map<IEnumerable<MasterRecord>, IEnumerable<MasterRecordEx>>(records);
            var (numberGameAndHappy5Records, happy5LinkedGameRecords) = SplitRecordsByBettype(recordExs);
            return new MasterData(Build<MasterRecordEx, MatchData<MasterRecordEx>>(numberGameAndHappy5Records), happy5LinkedGameRecords);
        }

        public async Task<AgentData> QueryAgent(QueryRequest request)
        {
            var records = await Query<AgentRecord>(request).ConfigureAwait(false);
            var recordExs = mapper.Map<IEnumerable<AgentRecord>, IEnumerable<AgentRecordEx>>(records);
            var (numberGameAndHappy5Records, happy5LinkedGameRecords) = SplitRecordsByBettype(recordExs);
            return new AgentData(Build<AgentRecordEx, MatchData<AgentRecordEx>>(numberGameAndHappy5Records), happy5LinkedGameRecords);
        }

        private IEnumerable<K> Build<T, K>(IEnumerable<T> records)
        where T : IRecordEx<T>, new()
        where K : MatchData<T>
        {
            return records.GroupBy(r => new
            {
                r.LeagueId,
                r.MatchId,
                r.MatchCode
            }).Select(gcs =>
            {
                var leagueName = sharedLocalizer["NumberGame"] + "-" + reportService.GetLeagueName(gcs.Key.LeagueId);
                var matchName = sharedLocalizer["NumberGame"] + $" No {gcs.Key.MatchCode}";
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