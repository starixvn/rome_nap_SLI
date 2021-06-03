namespace NAP.SLI.WinLossDetail.Services
{
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
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
        Task<byte[]> ExcelSuper(WinLossDetailExcelRequest request);

        Task<byte[]> ExcelMaster(WinLossDetailExcelRequest request);

        Task<byte[]> ExcelAgent(WinLossDetailExcelRequest request);
    }

    public class WinLossDetailExcelService : IWinLossDetailExcelService
    {
        private readonly IReportService reportService;
        private readonly ISharedLocalizer sharedLocalizer;
        private readonly INoLocalizer noLocalizer;
        private readonly IAppSettings appSettings;
        private readonly IDynamicRepositoryEx dynamicRepositoryEx;
        private readonly INpoiWorkbookFactory npoiWorkbookFactory;

        public WinLossDetailExcelService(IReportService reportService, ISharedLocalizer sharedLocalizer, IAppSettings appSettings, IDynamicRepositoryEx dynamicRepositoryEx, INpoiWorkbookFactory npoiWorkbookFactory, INoLocalizer noLocalizer)
            => (this.reportService, this.sharedLocalizer, this.appSettings, this.dynamicRepositoryEx, this.npoiWorkbookFactory, this.noLocalizer) = (reportService, sharedLocalizer, appSettings, dynamicRepositoryEx, npoiWorkbookFactory, noLocalizer);

        public async Task<byte[]> ExcelSuper(WinLossDetailExcelRequest request)
        {
            var (Records, Total, TotalRecords) = await Query<SuperRecord>(request).ConfigureAwait(false);
            var workbook = npoiWorkbookFactory.Create<SuperRecord>();
            var filePath = Path.Combine(appSettings.AppDataPath, "ExcelTemplates", "WinLossDetail", "Master.xls");
            workbook.UseTemplate(new TemplateInfo(filePath).FreezePanel(4, Column.B));
            workbook.Title(request.GetExcelTitle());
            workbook.Header(noLocalizer.Localise);
            workbook.Body(Records, CreateViewMasterMapper(true));
            workbook.Footer(Total, CreateViewMasterMapper(false));
            workbook.Sheet(sharedLocalizer["DefaultSheetName"]);
            return workbook.ExportToBytes();
        }

        private static Mapper<SuperRecord> CreateViewMasterMapper(bool isBody)
        {
            var mapper = new Mapper<SuperRecord>()
                .Map(Column.B, x => x.BetCount)
                .Map(Column.C, x => x.Turnover)
                .Map(Column.D, x => x.MemberWinLoss)
                .Map(Column.E, x => x.AgentWinLoss)
                .Map(Column.F, x => x.MasterWinLoss)
                .Map(Column.G, x => x.SuperWinLoss)
                .Map(Column.H, x => -x.MemberWinLoss + x.AgentWinLoss + x.MasterWinLoss + x.SuperWinLoss);
            if (isBody)
            {
                mapper.Map(Column.A, x => x.Username);
            }

            return mapper;
        }

        public async Task<byte[]> ExcelMaster(WinLossDetailExcelRequest request)
        {
            var (Records, Total, TotalRecords) = await Query<MasterRecord>(request).ConfigureAwait(false);
            var workbook = npoiWorkbookFactory.Create<MasterRecord>();
            var filePath = Path.Combine(appSettings.AppDataPath, "ExcelTemplates", "WinLossDetail", "Agent.xls");
            workbook.UseTemplate(new TemplateInfo(filePath).FreezePanel(4, Column.B));
            workbook.Title(request.GetExcelTitle());
            workbook.Header(noLocalizer.Localise);
            workbook.Body(Records, CreateViewAgentMapper(true));
            workbook.Footer(Total, CreateViewAgentMapper(false));
            workbook.Sheet(sharedLocalizer["DefaultSheetName"]);
            return workbook.ExportToBytes();
        }

        private static Mapper<MasterRecord> CreateViewAgentMapper(bool isBody)
        {
            var mapper = new Mapper<MasterRecord>()
                .Map(Column.B, x => x.BetCount)
                .Map(Column.C, x => x.Turnover)
                .Map(Column.D, x => x.MemberWinLoss)
                .Map(Column.E, x => x.AgentWinLoss)
                .Map(Column.F, x => x.MasterWinLoss)
                .Map(Column.G, x => -x.MemberWinLoss + x.AgentWinLoss + x.MasterWinLoss);
            if (isBody)
            {
                mapper.Map(Column.A, x => x.Username);
            }

            return mapper;
        }

        public async Task<byte[]> ExcelAgent(WinLossDetailExcelRequest request)
        {
            var (Records, Total, TotalRecords) = await Query<AgentRecord>(request).ConfigureAwait(false);
            var workbook = npoiWorkbookFactory.Create<AgentRecord>();
            var filePath = Path.Combine(appSettings.AppDataPath, "ExcelTemplates", "WinLossDetail", "Member.xls");
            workbook.UseTemplate(new TemplateInfo(filePath).FreezePanel(4, Column.B));
            workbook.Title(request.GetExcelTitle());
            workbook.Header(noLocalizer.Localise);
            workbook.Body(Records, CreateViewMemberMapper(true));
            workbook.Footer(Total, CreateViewMemberMapper(false));
            workbook.Sheet(sharedLocalizer["DefaultSheetName"]);
            return workbook.ExportToBytes();
        }

        private static Mapper<AgentRecord> CreateViewMemberMapper(bool isBody)
        {
            var mapper = new Mapper<AgentRecord>()
                .Map(Column.B, x => x.BetCount)
                .Map(Column.C, x => x.Turnover)
                .Map(Column.D, x => x.MemberWinLoss)
                .Map(Column.E, x => x.AgentWinLoss)
                .Map(Column.F, x => -x.MemberWinLoss + x.AgentWinLoss);
            if (isBody)
            {
                mapper.Map(Column.A, x => x.Username);
            }

            return mapper;
        }

        private async Task<(IEnumerable<T> Records, T Total, int TotalRecords)> Query<T>(WinLossDetailExcelRequest request)
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
            var (firstResultSet, secondResultSet) = await dynamicRepositoryEx.FetchMultipleAsync<T, T>(criteria).ConfigureAwait(false);
            return (firstResultSet, secondResultSet.First(), criteria.TotalRecords);
        }
    }
}