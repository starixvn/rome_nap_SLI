namespace NAP.SLI.WinLossDetail.Services
{
    using System.IO;
    using System.Threading.Tasks;
    using AutoMapper;
    using NAP.SLI.Common.Extensions;
    using NAP.SLI.Common.Services;
    using NAP.SLI.Localization.Services;
    using NAP.SLI.WinLossDetail.Models;
    using NAP.SLI.WinLossDetail.Requests;
    using ONEbook.SpreadSheets;
    using ONEbook.SpreadSheets.NPOI;

    public interface IExcelService
    {
        Task<byte[]> ExcelSuper(ExcelRequest request);

        Task<byte[]> ExcelMaster(ExcelRequest request);

        Task<byte[]> ExcelAgent(ExcelRequest request);

        string GetTitle(ExcelRequest request);
    }

    public class ExcelService : IExcelService
    {
        private readonly ISharedLocalizer sharedLocalizer;
        private readonly INoLocalizer noLocalizer;
        private readonly IAppSettings appSettings;
        private readonly INpoiWorkbookFactory npoiWorkbookFactory;
        private readonly IQueryService queryService;
        private readonly IMapper mapper;

        public ExcelService(IQueryService queryService, ISharedLocalizer sharedLocalizer, IAppSettings appSettings, INpoiWorkbookFactory npoiWorkbookFactory, INoLocalizer noLocalizer, IMapper mapper)
            => (this.queryService, this.sharedLocalizer, this.appSettings, this.npoiWorkbookFactory, this.noLocalizer, this.mapper) = (queryService, sharedLocalizer, appSettings, npoiWorkbookFactory, noLocalizer, mapper);

        public async Task<byte[]> ExcelSuper(ExcelRequest request)
        {
            var queryRequest = mapper.Map<QueryRequest>(request);
            var queryData = await queryService.QuerySuper(queryRequest).ConfigureAwait(false);
            var workbook = CreateWorkbook<SuperRecord>("Super.xls", GetTitle(request));
            var workbookDef = new SuperWorkbookDef();
            workbook.Body(queryData.Records, workbookDef.CreateMapper(true));
            workbook.Footer(queryData.Total, workbookDef.CreateMapper(false));
            return workbook.ExportToBytes();
        }

        public async Task<byte[]> ExcelMaster(ExcelRequest request)
        {
            var queryRequest = mapper.Map<QueryRequest>(request);
            var queryData = await queryService.QueryMaster(queryRequest).ConfigureAwait(false);
            var workbook = CreateWorkbook<MasterRecord>("Master.xls", GetTitle(request));
            var workbookDef = new MasterWorkbookDef();
            workbook.Body(queryData.Records, workbookDef.CreateMapper(true));
            workbook.Footer(queryData.Total, workbookDef.CreateMapper(false));
            return workbook.ExportToBytes();
        }

        private Workbook<T> CreateWorkbook<T>(string fileName, string title) where T : AgentRecord
        {
            var workbook = npoiWorkbookFactory.Create<T>();
            var filePath = Path.Combine(appSettings.AppDataPath, "ExcelTemplates", "WinLossDetail", fileName);
            workbook.UseTemplate(new TemplateInfo(filePath).FreezePanel(4, Column.B));
            workbook.Title(title);
            workbook.Header(noLocalizer.Localise);
            workbook.Sheet(sharedLocalizer["DefaultSheetName"]);
            return workbook;
        }

        public async Task<byte[]> ExcelAgent(ExcelRequest request)
        {
            var queryRequest = mapper.Map<QueryRequest>(request);
            var queryData = await queryService.QueryAgent(queryRequest).ConfigureAwait(false);
            var workbook = CreateWorkbook<AgentRecord>("Agent.xls", GetTitle(request));
            var workbookDef = new AgentWorkbookDef();
            workbook.Body(queryData.Records, workbookDef.CreateMapper(true));
            workbook.Footer(queryData.Total, workbookDef.CreateMapper(false));
            return workbook.ExportToBytes();
        }

        public string GetTitle(ExcelRequest request)
        {
            return $"Win Loss Detail {request.FromDate.ToDateString()} {request.ToDate.ToDateString()}";
        }
    }
}