using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using NAP.SLI.Common.Services;
using NAP.SLI.WinLossDetail.Criteria;
using NAP.SLI.WinLossDetail.Models;
using NAP.SLI.WinLossDetail.Requests;

namespace NAP.SLI.WinLossDetail.Services
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
        private readonly IDynamicRepositoryEx dynamicRepositoryEx;

        public QueryService(IReportService reportService, IDynamicRepositoryEx dynamicRepositoryEx)
            => (this.reportService, this.dynamicRepositoryEx) = (reportService, dynamicRepositoryEx);

        public async Task<SuperData> QuerySuper(QueryRequest request)
        {
            var (Records, Total, TotalRecords) = await Query<SuperRecord>(request).ConfigureAwait(false);
            return new SuperData
            {
                Records = Records,
                Total = Total,
                TotalRecords = TotalRecords
            };
        }

        public async Task<MasterData> QueryMaster(QueryRequest request)
        {
            var (Records, Total, TotalRecords) = await Query<MasterRecord>(request).ConfigureAwait(false);
            return new MasterData
            {
                Records = Records,
                Total = Total,
                TotalRecords = TotalRecords
            };
        }

        public async Task<AgentData> QueryAgent(QueryRequest request)
        {
            var (Records, Total, TotalRecords) = await Query<AgentRecord>(request).ConfigureAwait(false);
            return new AgentData
            {
                Records = Records,
                Total = Total,
                TotalRecords = TotalRecords
            };
        }

        private async Task<(IEnumerable<T> Records, T Total, int TotalRecords)> Query<T>(QueryRequest request)
        {
            var balanceUpDayModel = await reportService.GetBalanceUpDay().ConfigureAwait(false);
            var criteria = new QueryCriteria(balanceUpDayModel)
            {
                CustId = request.CustId,
                RoleId = request.RoleId,
                IsHistory = request.IsHistory,
                FromDate = request.FromDate,
                ToDate = request.ToDate,
                PageIndex = request.PageIndex,
                PageSize = request.PageSize
            };
            var (firstResultSet, secondResultSet) = await dynamicRepositoryEx.FetchMultipleAsync<T, T>(criteria).ConfigureAwait(false);
            return (firstResultSet, secondResultSet.First(), criteria.TotalRecords);
        }
    }
}