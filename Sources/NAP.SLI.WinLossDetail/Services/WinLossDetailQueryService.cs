using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using NAP.SLI.Common.Services;
using NAP.SLI.WinLossDetail.Criteria;
using NAP.SLI.WinLossDetail.Models;
using NAP.SLI.WinLossDetail.Requests;

namespace NAP.SLI.WinLossDetail.Services
{
    public interface IWinLossDetailQueryService
    {
        Task<SuperData> QuerySuper(WinLossDetailQueryRequest request);

        Task<MasterData> QueryMaster(WinLossDetailQueryRequest request);

        Task<AgentData> QueryAgent(WinLossDetailQueryRequest request);
    }

    public class WinLossDetailQueryService : IWinLossDetailQueryService
    {
        private readonly IReportService reportService;
        private readonly IDynamicRepositoryEx dynamicRepositoryEx;

        public WinLossDetailQueryService(IReportService reportService, IDynamicRepositoryEx dynamicRepositoryEx)
            => (this.reportService, this.dynamicRepositoryEx) = (reportService, dynamicRepositoryEx);

        public async Task<SuperData> QuerySuper(WinLossDetailQueryRequest request)
        {
            var (Records, Total, TotalRecords) = await Query<SuperRecord>(request).ConfigureAwait(false);
            return new SuperData
            {
                Records = Records,
                Total = Total,
                TotalRecords = TotalRecords
            };
        }

        public async Task<MasterData> QueryMaster(WinLossDetailQueryRequest request)
        {
            var (Records, Total, TotalRecords) = await Query<MasterRecord>(request).ConfigureAwait(false);
            return new MasterData
            {
                Records = Records,
                Total = Total,
                TotalRecords = TotalRecords
            };
        }

        public async Task<AgentData> QueryAgent(WinLossDetailQueryRequest request)
        {
            var (Records, Total, TotalRecords) = await Query<AgentRecord>(request).ConfigureAwait(false);
            return new AgentData
            {
                Records = Records,
                Total = Total,
                TotalRecords = TotalRecords
            };
        }

        private async Task<(IEnumerable<T> Records, T Total, int TotalRecords)> Query<T>(WinLossDetailQueryRequest request)
        {
            var balanceUpDayModel = await reportService.GetBalanceUpDay().ConfigureAwait(false);
            var criteria = new WinLossDetailQueryCriteria(balanceUpDayModel)
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