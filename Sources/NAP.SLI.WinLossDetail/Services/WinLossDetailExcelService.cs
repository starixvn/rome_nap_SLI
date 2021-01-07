namespace NAP.SLI.WinLossDetail.Services
{
    using System.Collections.Generic;
    using System.IO;
    using System.Threading.Tasks;
    using NAP.SLI.Common.Services;
    using NAP.SLI.Localization.Services;
    using NAP.SLI.WinLossDetail.Criteria;
    using NAP.SLI.WinLossDetail.Models;
    using NAP.SLI.WinLossDetail.Requests;
    using ONEbook.SpreadSheets;
    using ONEbook.SpreadSheets.NPOI;

    public interface IWinLossDetailExcelService
    {
        Task<byte[]> ExcelViewMaster(WinLossDetailExcelRequest request);

        Task<byte[]> ExcelViewAgent(WinLossDetailExcelRequest request);

        Task<byte[]> ExcelViewMember(WinLossDetailExcelRequest request);
    }

    public class WinLossDetailExcelService : IWinLossDetailExcelService
    {
        private readonly IReportService reportService;
        private readonly IWinLossDetailQueryService winLossDetailQueryService;
        private readonly ISharedLocalizer sharedLocalizer;
        private readonly IAppSettings appSettings;

        public WinLossDetailExcelService(IReportService reportService, IWinLossDetailQueryService winLossDetailQueryService, ISharedLocalizer sharedLocalizer, IAppSettings appSettings)
            => (this.reportService, this.winLossDetailQueryService, this.sharedLocalizer, this.appSettings) = (reportService, winLossDetailQueryService, sharedLocalizer, appSettings);

        public async Task<byte[]> ExcelViewMaster(WinLossDetailExcelRequest request)
        {
            var result = await Query<ViewMasterModel>(request).ConfigureAwait(false);
            var workbook = new NpoiWorkbook<ViewMasterModel>();
            var filePath = Path.Combine(appSettings.AppDataPath, "ExcelTemplates", "WinLossDetail", "Master.xls");
            workbook.UseTemplate(new TemplateInfo(filePath).FreezePanel(4, Column.B));
            workbook.Title(request.GetExcelTitle());
            workbook.Header(key => key);
            workbook.Body(result.Records, CreateViewMasterMapper(true));
            workbook.Footer(result.Total, CreateViewMasterMapper(false));
            workbook.Sheet(sharedLocalizer["DefaultSheetName"]);
            return workbook.ExportToBytes();
        }

        private Mapper<ViewMasterModel> CreateViewMasterMapper(bool isBody)
        {
            var mapper = new Mapper<ViewMasterModel>()
                .Map(Column.B, x => x.BetCount)
                .Map(Column.C, x => x.Turnover)
                .Map(Column.D, x => x.MemberWinLoss)
                .Map(Column.E, x => x.AgentWinLoss)
                .Map(Column.F, x => x.MasterWinLoss)
                .Map(Column.G, x => x.SuperWinLoss)
                .Map(Column.H, x => x.MemberWinLoss + x.AgentWinLoss + x.MasterWinLoss + x.SuperWinLoss);
            if (isBody)
            {
                mapper.Map(Column.A, x => x.Username);
            }

            return mapper;
        }

        public async Task<byte[]> ExcelViewAgent(WinLossDetailExcelRequest request)
        {
            var result = await Query<ViewAgentModel>(request).ConfigureAwait(false);
            var workbook = new NpoiWorkbook<ViewAgentModel>();
            var filePath = Path.Combine(appSettings.AppDataPath, "ExcelTemplates", "WinLossDetail", "Agent.xls");
            workbook.UseTemplate(new TemplateInfo(filePath).FreezePanel(4, Column.B));
            workbook.Title(request.GetExcelTitle());
            workbook.Header(key => key);
            workbook.Body(result.Records, CreateViewAgentMapper(true));
            workbook.Footer(result.Total, CreateViewAgentMapper(false));
            workbook.Sheet(sharedLocalizer["DefaultSheetName"]);
            return workbook.ExportToBytes();
        }

        private Mapper<ViewAgentModel> CreateViewAgentMapper(bool isBody)
        {
            var mapper = new Mapper<ViewAgentModel>()
                .Map(Column.B, x => x.BetCount)
                .Map(Column.C, x => x.Turnover)
                .Map(Column.D, x => x.MemberWinLoss)
                .Map(Column.E, x => x.AgentWinLoss)
                .Map(Column.F, x => x.MasterWinLoss)
                .Map(Column.G, x => x.MemberWinLoss + x.AgentWinLoss + x.MasterWinLoss);
            if (isBody)
            {
                mapper.Map(Column.A, x => x.Username);
            }

            return mapper;
        }

        public async Task<byte[]> ExcelViewMember(WinLossDetailExcelRequest request)
        {
            var result = await Query<ViewMemberModel>(request).ConfigureAwait(false);
            var workbook = new NpoiWorkbook<ViewMemberModel>();
            var filePath = Path.Combine(appSettings.AppDataPath, "ExcelTemplates", "WinLossDetail", "Member.xls");
            workbook.UseTemplate(new TemplateInfo(filePath).FreezePanel(4, Column.B));
            workbook.Title(request.GetExcelTitle());
            workbook.Header(key => key);
            workbook.Body(result.Records, CreateViewMemberMapper(true));
            workbook.Footer(result.Total, CreateViewMemberMapper(false));
            workbook.Sheet(sharedLocalizer["DefaultSheetName"]);
            return workbook.ExportToBytes();
        }

        private Mapper<ViewMemberModel> CreateViewMemberMapper(bool isBody)
        {
            var mapper = new Mapper<ViewMemberModel>()
                .Map(Column.B, x => x.BetCount)
                .Map(Column.C, x => x.Turnover)
                .Map(Column.D, x => x.MemberWinLoss)
                .Map(Column.E, x => x.AgentWinLoss)
                .Map(Column.F, x => x.MemberWinLoss + x.AgentWinLoss);
            if (isBody)
            {
                mapper.Map(Column.A, x => x.Username);
            }

            return mapper;
        }

        private async Task<(IEnumerable<T> Records, T Total)> Query<T>(WinLossDetailExcelRequest request)
        {
            var balanceUpDayModel = await reportService.GetBalanceUpDay().ConfigureAwait(false);
            var criteria = new WinLossDetailQueryCriteria(balanceUpDayModel)
            {
                CustId = request.CustId,
                RoleId = request.RoleId,
                IsHistory = request.IsHistory,
                FromDate = request.FromDate,
                ToDate = request.ToDate
            };
            return await winLossDetailQueryService.Query<T>(criteria).ConfigureAwait(false);
        }
    }
}