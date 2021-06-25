namespace NAP.SLI.WinLossAnalysis.Services
{
    using System.IO;
    using System.Threading.Tasks;
    using AutoMapper;
    using NAP.SLI.Common.Extensions;
    using NAP.SLI.Common.Services;
    using NAP.SLI.Localization.Services;
    using NAP.SLI.WinLossAnalysis.Models;
    using NAP.SLI.WinLossAnalysis.Requests;
    using ONEbook.SpreadSheets;
    using ONEbook.SpreadSheets.NPOI;

    public interface IExcelService
    {
        Task<byte[]> ExcelSuper(ExcelRequest request);

        Task<byte[]> ExcelMaster(ExcelRequest request);

        Task<byte[]> ExcelAgent(ExcelRequest request);
    }

    public class ExcelService : IExcelService
    {
        private readonly IQueryService queryService;
        private readonly IAppSettings appSettings;
        private readonly ISharedLocalizer sharedLocalizer;
        private readonly INoLocalizer noLocalizer;
        private readonly INpoiWorkbookFactory npoiWorkbookFactory;
        private readonly IMapper mapper;

        public ExcelService(
            IQueryService queryService,
            IAppSettings appSettings,
            ISharedLocalizer sharedLocalizer,
            INoLocalizer noLocalizer,
            INpoiWorkbookFactory npoiWorkbookFactory,
            IMapper mapper)
        {
            this.queryService = queryService;
            this.appSettings = appSettings;
            this.sharedLocalizer = sharedLocalizer;
            this.npoiWorkbookFactory = npoiWorkbookFactory;
            this.noLocalizer = noLocalizer;
            this.mapper = mapper;
        }

        public async Task<byte[]> ExcelSuper(ExcelRequest request)
        {
            var queryRequest = mapper.Map<QueryRequest>(request);
            var queryData = await queryService.QuerySuper(queryRequest).ConfigureAwait(false);
            var workbook = CreateWorkbook<SuperRecord>("Master.xls", GetTitle(request));
            var workbookDef = new SuperWorkbookDef();
            workbook.Body(queryData.Records, workbookDef.CreateMapper(true));
            workbook.Footer(queryData.Total, workbookDef.CreateMapper(false));
            return workbook.ExportToBytes();
        }

        public async Task<byte[]> ExcelMaster(ExcelRequest request)
        {
            var queryRequest = mapper.Map<QueryRequest>(request);
            var queryData = await queryService.QueryMaster(queryRequest).ConfigureAwait(false);
            var workbook = CreateWorkbook<MasterRecord>("Agent.xls", GetTitle(request));
            var workbookDef = new MasterWorkbookDef();
            workbook.Body(queryData.Records, workbookDef.CreateMapper(true));
            workbook.Footer(queryData.Total, workbookDef.CreateMapper(false));
            return workbook.ExportToBytes();
        }

        public async Task<byte[]> ExcelAgent(ExcelRequest request)
        {
            var queryRequest = mapper.Map<QueryRequest>(request);
            var queryData = await queryService.QueryAgent(queryRequest).ConfigureAwait(false);
            var workbook = CreateWorkbook<AgentRecord>("Member.xls", GetTitle(request));
            var workbookDef = new AgentWorkbookDef();
            workbook.Body(queryData.Records, workbookDef.CreateMapper(true));
            workbook.Footer(queryData.Total, workbookDef.CreateMapper(false));
            return workbook.ExportToBytes();
        }

        private static string GetTitle(ExcelRequest request)
        {
            return $"Win Loss Analysis {request.FromDate.ToDateString()} {request.ToDate.ToDateString()}";
        }

        private Workbook<T> CreateWorkbook<T>(string fileName, string title) where T : AgentRecord
        {
            var workbook = npoiWorkbookFactory.Create<T>();
            var filePath = Path.Combine(appSettings.AppDataPath, "ExcelTemplates", "WinLossAnalysis", fileName);
            workbook.UseTemplate(new TemplateInfo(filePath).FreezePanel(4, Column.B));
            workbook.Title(title);
            workbook.Header(noLocalizer.Localise);
            workbook.Sheet(sharedLocalizer["DefaultSheetName"]);
            return workbook;
        }
    }
}