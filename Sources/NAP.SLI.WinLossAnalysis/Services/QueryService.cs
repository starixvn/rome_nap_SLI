namespace NAP.SLI.WinLossAnalysis.Services
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
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

        public QueryService(
            IReportService reportService,
            IDynamicRepositoryEx dynamicRepositoryEx)
        {
            this.reportService = reportService;
            this.dynamicRepositoryEx = dynamicRepositoryEx;
        }

        public async Task<SuperData> QuerySuper(QueryRequest request)
        {
            var (Records, Total) = await Query<SuperRecord>(request).ConfigureAwait(false);
            return new SuperData
            {
                Records = Records,
                Total = Total
            };
        }

        public async Task<MasterData> QueryMaster(QueryRequest request)
        {
            var (Records, Total) = await Query<MasterRecord>(request).ConfigureAwait(false);
            return new MasterData
            {
                Records = Records,
                Total = Total
            };
        }

        public async Task<AgentData> QueryAgent(QueryRequest request)
        {
            var (Records, Total) = await Query<AgentRecord>(request).ConfigureAwait(false);
            return new AgentData
            {
                Records = Records,
                Total = Total
            };
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