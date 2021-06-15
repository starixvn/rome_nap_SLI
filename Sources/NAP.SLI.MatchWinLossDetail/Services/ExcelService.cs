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
        private readonly INoLocalizer noLocalizer;
        private readonly IAppSettings appSettings;
        private readonly INpoiWorkbookFactory npoiWorkbookFactory;
        private readonly IQueryService queryService;
        private readonly IMapper mapper;

        public ExcelService(ISharedLocalizer sharedLocalizer, IAppSettings appSettings, IQueryService queryService, INpoiWorkbookFactory npoiWorkbookFactory, INoLocalizer noLocalizer, IMapper mapper)
            => (this.sharedLocalizer, this.appSettings, this.queryService, this.npoiWorkbookFactory, this.noLocalizer, this.mapper) = (sharedLocalizer, appSettings, queryService, npoiWorkbookFactory, noLocalizer, mapper);

        public async Task<byte[]> ExcelSuper(ExcelRequest request)
        {
            var queryRequest = mapper.Map<QueryRequest>(request);
            var queryData = await queryService.QuerySuper(queryRequest).ConfigureAwait(false);
            var workbook = CreateWorkbook<SuperRecord2>("Master.xls", GetTitle(request));
            return workbook.ExportToBytes();
        }

        public async Task<byte[]> ExcelMaster(ExcelRequest request)
        {
            var queryRequest = mapper.Map<QueryRequest>(request);
            var queryData = await queryService.QueryMaster(queryRequest).ConfigureAwait(false);
            var workbook = CreateWorkbook<MasterRecord2>("Agent.xls", GetTitle(request));
            return workbook.ExportToBytes();
        }

        private Workbook<T> CreateWorkbook<T>(string fileName, string title) where T : AgentRecord
        {
            var workbook = npoiWorkbookFactory.Create<T>();
            var filePath = Path.Combine(appSettings.AppDataPath, "ExcelTemplates", "MatchWinLossDetail", fileName);
            workbook.UseTemplate(new TemplateInfo(filePath).FreezePanel(4, Column.B));
            workbook.Title(title);
            workbook.Header(noLocalizer.Localise);
            workbook.Sheet(sharedLocalizer["DefaultSheetName"]);
            return workbook;
        }

        private static string GetTitle(ExcelRequest request)
        {
            return $"Match Win Loss Detail {request.FromDate.ToDateString()} {request.ToDate.ToDateString()}";
        }

        public async Task<byte[]> ExcelAgent(ExcelRequest request)
        {
            var queryRequest = mapper.Map<QueryRequest>(request);
            var queryData = await queryService.QueryAgent(queryRequest).ConfigureAwait(false);
            var workbook = CreateWorkbook<AgentRecord2>("Member.xls", GetTitle(request));
            return workbook.ExportToBytes();
        }
    }
}