namespace NAP.SLI.Report.Services
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using NAP.SLI.Common.Models;
    using NAP.SLI.Common.Services;
    using NAP.SLI.Report.Criteria;
    using NAP.SLI.Report.Models;
    using NAP.SLI.Report.Models.WinLossAnalysis;
    using NAP.SLI.Report.Requests;

    public interface IWinLossAnalysisService
    {
        Task<QueryModel> Query(WinLossAnalysisQueryRequest request);
    }

    public class WinLossAnalysisService : IWinLossAnalysisService
    {
        private readonly IReportService reportService;
        private readonly IDynamicRepositoryEx dynamicRepositoryEx;

        public WinLossAnalysisService(IReportService reportService, IDynamicRepositoryEx dynamicRepositoryEx)
        {
            this.reportService = reportService;
            this.dynamicRepositoryEx = dynamicRepositoryEx;
        }

        public async Task<QueryModel> Query(WinLossAnalysisQueryRequest request)
        {
            var balanceUpDayModel = await reportService.GetBalanceUpDay().ConfigureAwait(false);
            var criteria = new QueryWinLossAnalysisCriteria(balanceUpDayModel)
            {
                CustId = request.CustId,
                RoleId = request.RoleId,
                ReportType = request.ReportType,
                FromDate = request.FromDate,
                ToDate = request.ToDate
            };
            return await Query(criteria).ConfigureAwait(false);
        }

        private async Task<QueryModel> Query(QueryWinLossAnalysisCriteria criteria)
        {
            (IEnumerable<object> firstResultSet, IEnumerable<object> secondResultSet) result;
            switch (criteria.RoleId)
            {
                case (int)CustomerLevels.Super:
                    result = await dynamicRepositoryEx.FetchMultipleAsync<SuperAnalysisModel, SuperAnalysisModel>(criteria).ConfigureAwait(false);
                    break;
                case (int)CustomerLevels.Master:
                    result = await dynamicRepositoryEx.FetchMultipleAsync<MasterAnalysisModel, SuperAnalysisModel>(criteria).ConfigureAwait(false);
                    break;
                case (int)CustomerLevels.Agent:
                    result = await dynamicRepositoryEx.FetchMultipleAsync<AgentAnalysisModel, SuperAnalysisModel>(criteria).ConfigureAwait(false);
                    break;
                default:
                    throw new NotImplementedException();
            }

            return new QueryModel
            {
                Records = result.firstResultSet,
                Total = result.secondResultSet.First(),
            };
        }
    }
}
