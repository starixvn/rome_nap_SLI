namespace NAP.SLI.WinLossByBetType.Services
{
    using System.IO;
    using System.Threading.Tasks;
    using AutoMapper;
    using NAP.SLI.Common.Services;
    using NAP.SLI.Localization.Services;
    using NAP.SLI.WinLossByBetType.Extensions;
    using NAP.SLI.WinLossByBetType.Models;
    using NAP.SLI.WinLossByBetType.Requests;
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
        private readonly ILocalizeService localizeService;
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
            this.mapper = mapper;
            localizeService = new LocalizeService(noLocalizer);
        }

        public async Task<byte[]> ExcelSuper(ExcelRequest request)
        {
            var queryRequest = mapper.Map<QueryRequest>(request);
            var queryData = await queryService.QuerySuper(queryRequest).ConfigureAwait(false);
            var workbook = CreateWorkbook<SuperRecord>("Master.xls", request.GetTitle());
            var workbookDef = new SuperWorkbookDef();
            workbook.Body(queryData.Records, workbookDef.CreateMapper(true));
            workbook.Footer(queryData.Total, workbookDef.CreateMapper(false));
            return workbook.ExportToBytes();
        }

        public async Task<byte[]> ExcelMaster(ExcelRequest request)
        {
            var queryRequest = mapper.Map<QueryRequest>(request);
            var queryData = await queryService.QueryMaster(queryRequest).ConfigureAwait(false);
            var workbook = CreateWorkbook<MasterRecord>("Agent.xls", request.GetTitle());
            var workbookDef = new MasterWorkbookDef();
            workbook.Body(queryData.Records, workbookDef.CreateMapper(true));
            workbook.Footer(queryData.Total, workbookDef.CreateMapper(false));
            return workbook.ExportToBytes();
        }

        public async Task<byte[]> ExcelAgent(ExcelRequest request)
        {
            var queryRequest = mapper.Map<QueryRequest>(request);
            var queryData = await queryService.QueryAgent(queryRequest).ConfigureAwait(false);
            var workbook = CreateWorkbook<AgentRecord>("Member.xls", request.GetTitle());
            var workbookDef = new AgentWorkbookDef();
            workbook.Body(queryData.Records, workbookDef.CreateMapper(true));
            workbook.Footer(queryData.Total, workbookDef.CreateMapper(false));
            return workbook.ExportToBytes();
        }

        private Workbook<T> CreateWorkbook<T>(string fileName, string title) where T : RecordBase
        {
            var workbook = npoiWorkbookFactory.Create<T>();
            var filePath = Path.Combine(appSettings.AppDataPath, "ExcelTemplates", "WinLossByBetType", fileName);
            workbook.UseTemplate(new TemplateInfo(filePath).FreezePanel(4, Column.B));
            workbook.Title(title);
            workbook.Header(localizeService.Localize);
            workbook.Sheet(sharedLocalizer["DefaultSheetName"]);
            return workbook;
        }
    }
}