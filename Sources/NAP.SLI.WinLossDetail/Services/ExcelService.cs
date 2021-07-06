namespace NAP.SLI.WinLossDetail.Services
{
    using System.IO;
    using System.Threading.Tasks;
    using AutoMapper;
    using NAP.SLI.Common.Services;
    using NAP.SLI.Localization.Services;
    using NAP.SLI.WinLossDetail.Extensions;
    using NAP.SLI.WinLossDetail.Models;
    using NAP.SLI.WinLossDetail.Requests;
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
        private readonly ISharedLocalizer sharedLocalizer;
        private readonly ILocalizeService localizeService;
        private readonly IAppSettings appSettings;
        private readonly INpoiWorkbookFactory npoiWorkbookFactory;
        private readonly IQueryService queryService;
        private readonly IMapper mapper;

        public ExcelService(
            IQueryService queryService,
            ISharedLocalizer sharedLocalizer,
            IAppSettings appSettings,
            INpoiWorkbookFactory npoiWorkbookFactory,
            INoLocalizer noLocalizer,
            IMapper mapper)
        {
            (this.queryService, this.sharedLocalizer, this.appSettings, this.npoiWorkbookFactory, this.mapper) = (queryService, sharedLocalizer, appSettings, npoiWorkbookFactory, mapper);
            localizeService = new LocalizeService(noLocalizer);
        }

        public async Task<byte[]> ExcelSuper(ExcelRequest request)
        {
            var queryRequest = mapper.Map<QueryRequest>(request);
            var queryData = await queryService.QuerySuper(queryRequest).ConfigureAwait(false);
            var workbook = CreateWorkbook<SuperRecordEx>("Master.xls", request.GetTitle());
            var workbookDef = new SuperWorkbookDef();
            workbook.Body(queryData.Records, workbookDef.CreateMapper(true));
            workbook.Footer(queryData.Total, workbookDef.CreateMapper(false));
            return workbook.ExportToBytes();
        }

        public async Task<byte[]> ExcelMaster(ExcelRequest request)
        {
            var queryRequest = mapper.Map<QueryRequest>(request);
            var queryData = await queryService.QueryMaster(queryRequest).ConfigureAwait(false);
            var workbook = CreateWorkbook<MasterRecordEx>("Agent.xls", request.GetTitle());
            var workbookDef = new MasterWorkbookDef();
            workbook.Body(queryData.Records, workbookDef.CreateMapper(true));
            workbook.Footer(queryData.Total, workbookDef.CreateMapper(false));
            return workbook.ExportToBytes();
        }

        public async Task<byte[]> ExcelAgent(ExcelRequest request)
        {
            var queryRequest = mapper.Map<QueryRequest>(request);
            var queryData = await queryService.QueryAgent(queryRequest).ConfigureAwait(false);
            var workbook = CreateWorkbook<AgentRecordEx>("Member.xls", request.GetTitle());
            var workbookDef = new AgentWorkbookDef();
            workbook.Body(queryData.Records, workbookDef.CreateMapper(true));
            workbook.Footer(queryData.Total, workbookDef.CreateMapper(false));
            return workbook.ExportToBytes();
        }

        private Workbook<T> CreateWorkbook<T>(string fileName, string title) where T : class
        {
            var workbook = npoiWorkbookFactory.Create<T>();
            var filePath = Path.Combine(appSettings.AppDataPath, "ExcelTemplates", "WinLossDetail", fileName);
            workbook.UseTemplate(new TemplateInfo(filePath).FreezePanel(4, Column.B));
            workbook.Title(title);
            workbook.Header(localizeService.Localize);
            workbook.Sheet(sharedLocalizer["DefaultSheetName"]);
            return workbook;
        }
    }
}