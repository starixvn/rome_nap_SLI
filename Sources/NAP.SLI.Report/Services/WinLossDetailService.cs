namespace NAP.SLI.Report.Services
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Threading.Tasks;
    using NAP.SLI.Common.Extensions;
    using NAP.SLI.Common.Models;
    using NAP.SLI.Common.Services;
    using NAP.SLI.Localization.Services;
    using NAP.SLI.Report.Criteria;
    using NAP.SLI.Report.Models;
    using NAP.SLI.Report.Models.WinLossDetail;
    using NAP.SLI.Report.Requests;
    using ONEbook.SpreadSheets;
    using ONEbook.SpreadSheets.NPOI;

    public interface IWinLossDetailService
    {
        Task<QueryModel> Query(WinLossDetailQueryRequest request);

        Task<byte[]> Excel(WinLossDetailExcelRequest request);
    }

    public class WinLossDetailService : IWinLossDetailService
    {
        private readonly IReportService reportService;
        private readonly IDynamicRepositoryEx dynamicRepositoryEx;
        private readonly ISharedLocalizer sharedLocalizer;
        private readonly IAppSettings appSettings;

        public WinLossDetailService(IReportService reportService, IDynamicRepositoryEx dynamicRepositoryEx, ISharedLocalizer sharedLocalizer, IAppSettings appSettings)
            => (this.reportService, this.dynamicRepositoryEx, this.sharedLocalizer, this.appSettings) = (reportService, dynamicRepositoryEx, sharedLocalizer, appSettings);

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

        public async Task<byte[]> Excel(WinLossDetailExcelRequest request)
        {
            var balanceUpDayModel = await reportService.GetBalanceUpDay().ConfigureAwait(false);
            var criteria = new QueryWinLossDetailCriteria(balanceUpDayModel)
            {
                CustId = request.CustId,
                RoleId = request.RoleId,
                IsHistory = request.IsHistory,
                FromDate = request.FromDate,
                ToDate = request.ToDate,
                PageIndex = 0,
                PageSize = 0
            };

            var queryModel = await Query(criteria).ConfigureAwait(false);
            return Excel(request, queryModel);
        }

        private byte[] Excel(WinLossDetailExcelRequest request, QueryModel queryModel)
        {
            var workbook = new NpoiWorkbook<ViewSuperModel>();
            var filePath = Path.Combine(appSettings.AppDataPath, "ExcelTemplates", "WinLossDetail", "Master.xls");
            workbook.UseTemplate(new TemplateInfo(filePath).FreezePanel(4, Column.B));
            workbook.Title($"Win Loss Detail {request.FromDate.ToDateString()} {request.ToDate.ToDateString()}");
            workbook.Header(key => key);
            workbook.Body(queryModel.Records as IEnumerable<ViewSuperModel>,
                new Mapper<ViewSuperModel>()
                    .Map(Column.A, x => x.Username)
                    .Map(Column.B, x => x.BetCount)
                    .Map(Column.C, x => x.Turnover)
                    .Map(Column.D, x => x.MemberWinLoss)
                    .Map(Column.E, x => x.AgentWinLoss)
                    .Map(Column.F, x => x.MasterWinLoss)
                    .Map(Column.G, x => x.SuperWinLoss)
                );
            workbook.Footer(queryModel.Total as ViewSuperModel,
                new Mapper<ViewSuperModel>()
                    .Map(Column.B, x => x.BetCount)
                    .Map(Column.C, x => x.Turnover)
                    .Map(Column.D, x => x.MemberWinLoss)
                    .Map(Column.E, x => x.AgentWinLoss)
                    .Map(Column.F, x => x.MasterWinLoss)
                    .Map(Column.G, x => x.SuperWinLoss)
                );
            workbook.Sheet(sharedLocalizer["DefaultSheetName"]);
            return workbook.ExportToBytes();
        }

        private async Task<QueryModel> Query(QueryWinLossDetailCriteria criteria)
        {
            var result = criteria.RoleId switch
            {
                (int)CustomerLevels.Super => await dynamicRepositoryEx.FetchMultipleAsync<ViewSuperModel, ViewSuperModel>(criteria).ConfigureAwait(false),
                (int)CustomerLevels.Master => await dynamicRepositoryEx.FetchMultipleAsync<ViewMasterModel, ViewMasterModel>(criteria).ConfigureAwait(false),
                (int)CustomerLevels.Agent => await dynamicRepositoryEx.FetchMultipleAsync<ViewAgentModel, ViewAgentModel>(criteria).ConfigureAwait(false),
                _ => throw new NotImplementedException()
            };
            (var firstResultSet, var secondResultSet) = result;
            return new QueryModel
            {
                Records = firstResultSet,
                Total = secondResultSet.First(),
                TotalRecords = criteria.TotalRecords
            };
        }
    }
}
