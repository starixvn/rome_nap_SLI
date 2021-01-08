namespace NAP.SLI.WinLossDetail.Services
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using NAP.SLI.Common.Services;
    using NAP.SLI.WinLossDetail.Criteria;
    using NAP.SLI.WinLossDetail.Requests;

    public interface IWinLossDetailQueryService
    {
        Task<(IEnumerable<T> Records, T Total, int TotalRecords)> Query<T>(WinLossDetailQueryRequest request);

        Task<(IEnumerable<T> Records, T Total)> Query<T>(WinLossDetailQueryCriteria criteria);
    }

    public class WinLossDetailQueryService : IWinLossDetailQueryService
    {
        private readonly IReportService reportService;
        private readonly IDynamicRepositoryEx dynamicRepositoryEx;

        public WinLossDetailQueryService(IReportService reportService, IDynamicRepositoryEx dynamicRepositoryEx)
            => (this.reportService, this.dynamicRepositoryEx) = (reportService, dynamicRepositoryEx);

        public async Task<(IEnumerable<T> Records, T Total, int TotalRecords)> Query<T>(WinLossDetailQueryRequest request)
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
            var result = await Query<T>(criteria).ConfigureAwait(false);
            return (result.Records, result.Total, criteria.TotalRecords);
        }

        public async Task<(IEnumerable<T> Records, T Total)> Query<T>(WinLossDetailQueryCriteria criteria)
        {
            var result = await dynamicRepositoryEx.FetchMultipleAsync<T, T>(criteria).ConfigureAwait(false);
            return (result.firstResultSet, result.secondResultSet.First());
        }
    }
}