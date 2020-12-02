namespace NAP.SLI.Report.Services
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using NAP.SLI.Common.Models;
    using NAP.SLI.Common.Services;
    using NAP.SLI.Report.Criteria;
    using NAP.SLI.Report.Models.WinLossDetail;
    using NAP.SLI.Report.Requests;

    public interface IWinLossDetailService
    {
        Task<QueryModel> Query(WinLossDetailQueryRequest request);
    }

    public class WinLossDetailService : IWinLossDetailService
    {
        private readonly IReportService reportService;
        private readonly IDynamicRepositoryEx dynamicRepositoryEx;

        public WinLossDetailService(IReportService reportService, IDynamicRepositoryEx dynamicRepositoryEx)
        {
            this.reportService = reportService;
            this.dynamicRepositoryEx = dynamicRepositoryEx;
        }

        public async Task<QueryModel> Query(WinLossDetailQueryRequest request)
        {
            var balanceUpDayModel = await reportService.GetBalanceUpDay().ConfigureAwait(false);
            var criteria = new QueryWinLossDetailCriteria(balanceUpDayModel)
            {
                CustId = request.CustId,
                RoleId = request.RoleId,
                IsHistory = request.IsHistory,
                FromDate = request.FromDate,
                ToDate = request.ToDate,
                PageIndex = request.PageIndex,
                PageSize = request.PageSize
            };
            return await Query(criteria).ConfigureAwait(false);
        }

        private async Task<QueryModel> Query(QueryWinLossDetailCriteria criteria)
        {
            (IEnumerable<object> firstResultSet, IEnumerable<object> secondResultSet) result;
            switch (criteria.RoleId)
            {
                case (int)CustomerLevels.Super:
                    result = await dynamicRepositoryEx.FetchMultipleAsync<ViewSuperModel, ViewSuperModel>(criteria).ConfigureAwait(false);
                    break;
                case (int)CustomerLevels.Master:
                    result = await dynamicRepositoryEx.FetchMultipleAsync<ViewMasterModel, ViewMasterModel>(criteria).ConfigureAwait(false);
                    break;
                case (int)CustomerLevels.Agent:
                    result = await dynamicRepositoryEx.FetchMultipleAsync<ViewAgentModel, ViewAgentModel>(criteria).ConfigureAwait(false);
                    break;
                default:
                    throw new NotImplementedException();
            }

            return new QueryModel
            {
                Records = result.firstResultSet,
                Total = result.secondResultSet.First(),
                TotalRecords = criteria.TotalRecords
            };
        }
    }
}
