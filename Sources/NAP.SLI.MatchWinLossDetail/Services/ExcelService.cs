namespace NAP.SLI.MatchWinLossDetail.Services
{
    using System.IO;
    using System.Threading.Tasks;
    using AutoMapper;
    using NAP.SLI.Common.Extensions;
    using NAP.SLI.Common.Services;
    using NAP.SLI.Localization.Services;
    using NAP.SLI.MatchWinLossDetail.Models;
    using NAP.SLI.MatchWinLossDetail.Requests;
    using ONEbook.SpreadSheets;

    public interface IExcelService
    {
        Task<byte[]> ExcelSuper(ExcelRequest request);

        Task<byte[]> ExcelMaster(ExcelRequest request);

        Task<byte[]> ExcelAgent(ExcelRequest request);
    }

    public class ExcelService : IExcelService
    {
        private readonly ISharedLocalizer sharedLocalizer;
        private readonly INoLocalizer noLocalizer;
        private readonly IAppSettings appSettings;
        private readonly IQueryService queryService;
        private readonly IMapper mapper;

        public ExcelService(ISharedLocalizer sharedLocalizer, IAppSettings appSettings, IQueryService queryService, INoLocalizer noLocalizer, IMapper mapper)
            => (this.sharedLocalizer, this.appSettings, this.queryService, this.noLocalizer, this.mapper) = (sharedLocalizer, appSettings, queryService, noLocalizer, mapper);

        public async Task<byte[]> ExcelSuper(ExcelRequest request)
        {
            var queryRequest = mapper.Map<QueryRequest>(request);
            var queryData = await queryService.QuerySuper(queryRequest).ConfigureAwait(false);
            var filePath = Path.Combine(appSettings.AppDataPath, "ExcelTemplates", "MatchWinLossDetail", "Master.xls");
            var workbookInfo = new WorkbookInfo(new TemplateInfo(filePath).FreezePanel(4, Column.B), GetTitle(request), noLocalizer.Localise, sharedLocalizer["DefaultSheetName"]);
            var workbook = new SuperWorkbook(workbookInfo, queryData);
            return workbook.ExportToBytes();
        }

        public async Task<byte[]> ExcelMaster(ExcelRequest request)
        {
            var queryRequest = mapper.Map<QueryRequest>(request);
            var queryData = await queryService.QueryMaster(queryRequest).ConfigureAwait(false);
            var filePath = Path.Combine(appSettings.AppDataPath, "ExcelTemplates", "MatchWinLossDetail", "Agent.xls");
            var workbookInfo = new WorkbookInfo(new TemplateInfo(filePath).FreezePanel(4, Column.B), GetTitle(request), noLocalizer.Localise, sharedLocalizer["DefaultSheetName"]);
            var workbook = new MasterWorkbook(workbookInfo, queryData);
            return workbook.ExportToBytes();
        }

        public async Task<byte[]> ExcelAgent(ExcelRequest request)
        {
            var queryRequest = mapper.Map<QueryRequest>(request);
            var queryData = await queryService.QueryAgent(queryRequest).ConfigureAwait(false);
            var filePath = Path.Combine(appSettings.AppDataPath, "ExcelTemplates", "MatchWinLossDetail", "Member.xls");
            var workbookInfo = new WorkbookInfo(new TemplateInfo(filePath).FreezePanel(4, Column.B), GetTitle(request), noLocalizer.Localise, sharedLocalizer["DefaultSheetName"]);
            var workbook = new AgentWorkbook(workbookInfo, queryData);
            return workbook.ExportToBytes();
        }

        private static string GetTitle(ExcelRequest request)
        {
            return $"Match Win Loss Detail {request.FromDate.ToDateString()} {request.ToDate.ToDateString()}";
        }
    }
}