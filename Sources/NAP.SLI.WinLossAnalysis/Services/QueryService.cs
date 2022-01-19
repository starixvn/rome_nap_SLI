namespace NAP.SLI.WinLossAnalysis.Services
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using AutoMapper;
    using NAP.SLI.Common.Models;
    using NAP.SLI.Common.Services;
    using NAP.SLI.WinLossAnalysis.Criteria;
    using NAP.SLI.WinLossAnalysis.Models;
    using NAP.SLI.WinLossAnalysis.Requests;

    public interface IQueryService
    {
        Task<SuperData> QuerySuper(QueryRequest request);

        Task<MasterData> QueryMaster(QueryRequest request);

        Task<AgentData> QueryAgent(QueryRequest request);
    }

    public class QueryService : IQueryService
    {
        private readonly IReportService reportService;
        private readonly IDynamicRepositoryEx dynamicRepositoryEx;
        private readonly IMapper mapper;

        public QueryService(
            IReportService reportService,
            IDynamicRepositoryEx dynamicRepositoryEx,
            IMapper mapper)
        {
            this.reportService = reportService;
            this.dynamicRepositoryEx = dynamicRepositoryEx;
            this.mapper = mapper;
        }

        public async Task<SuperData> QuerySuper(QueryRequest request)
        {
            var (Records, Total) = await Query<SuperRecord>(request).ConfigureAwait(false);
            if (request.ReportType == (int)ReportTypes.Sport)
            {
                UpdateSportTypeNames(Records);
            }

            return new SuperData
            {
                Records = mapper.Map<IEnumerable<SuperRecord>, IEnumerable<SuperRecordEx>>(Records),
                Total = mapper.Map<SuperRecord, SuperRecordEx>(Total)
            };
        }

        public async Task<MasterData> QueryMaster(QueryRequest request)
        {
            var (Records, Total) = await Query<MasterRecord>(request).ConfigureAwait(false);
            if (request.ReportType == (int)ReportTypes.Sport)
            {
                UpdateSportTypeNames(Records);
            }

            return new MasterData
            {
                Records = mapper.Map<IEnumerable<MasterRecord>, IEnumerable<MasterRecordEx>>(Records),
                Total = mapper.Map<MasterRecord, MasterRecordEx>(Total)
            };
        }

        public async Task<AgentData> QueryAgent(QueryRequest request)
        {
            var (Records, Total) = await Query<AgentRecord>(request).ConfigureAwait(false);
            if (request.ReportType == (int)ReportTypes.Sport)
            {
                UpdateSportTypeNames(Records);
            }

            return new AgentData
            {
                Records = mapper.Map<IEnumerable<AgentRecord>, IEnumerable<AgentRecordEx>>(Records),
                Total = mapper.Map<AgentRecord, AgentRecordEx>(Total)
            };
        }

        private void UpdateSportTypeNames(IEnumerable<AgentRecord> records)
        {
            foreach (var record in records)
            {
                record.RollupKey = reportService.GetSportTypeName(Convert.ToInt32(record.RollupKey));
            }
        }

        private async Task<(IEnumerable<T> Records, T Total)> Query<T>(QueryRequest request)
        {
            var balanceUpDayModel = await reportService.GetBalanceUpDay().ConfigureAwait(false);
            var criteria = new QueryCriteria(balanceUpDayModel)
            {
                CustId = request.CustId,
                RoleId = request.RoleId,
                ReportType = request.ReportType,
                FromDate = request.FromDate,
                ToDate = request.ToDate
            };
            var (firstResultSet, secondResultSet) = await dynamicRepositoryEx.FetchMultipleAsync<T, T>(criteria).ConfigureAwait(false);
            return (firstResultSet, secondResultSet.First());
        }
    }
}