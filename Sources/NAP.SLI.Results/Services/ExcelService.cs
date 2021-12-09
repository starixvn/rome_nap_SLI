namespace NAP.SLI.Results.Services
{
    using System.IO;
    using System.Text;
    using System.Threading.Tasks;
    using AutoMapper;
    using NAP.SLI.Common.Services;
    using NAP.SLI.Localization.Services;
    using NAP.SLI.Results.Extensions;
    using NAP.SLI.Results.Models;
    using NAP.SLI.Results.Requests;
    using ONEbook.SpreadSheets;
    using ONEbook.SpreadSheets.NPOI;

    public interface IExcelService
    {
        Task<byte[]> ExcelNumberGameResult(ExcelRequest request);

        Task<byte[]> ExcelHappy5Result(ExcelRequest request);
    }

    public class ExcelService : IExcelService
    {
        private readonly ISharedLocalizer sharedLocalizer;
        private readonly ILocalizeService localizeService;
        private readonly IAppSettings appSettings;
        private readonly IResultService resultService;
        private readonly IMapper mapper;

        public ExcelService(
            ISharedLocalizer sharedLocalizer,
            INoLocalizer noLocalizer,
            IAppSettings appSettings,
            IResultService resultService,
            IMapper mapper)
        {
            this.sharedLocalizer = sharedLocalizer;
            this.appSettings = appSettings;
            this.resultService = resultService;
            this.mapper = mapper;
            localizeService = new LocalizeService(noLocalizer);
        }

        public async Task<byte[]> ExcelNumberGameResult(ExcelRequest excelRequest)
        {
            var request = mapper.Map<ResultRequest>(excelRequest);
            var resultRecords = await resultService.GetNumberGameResult(request).ConfigureAwait(false);
            var workbookInfo = CreateWorkbookInfo("NumberGame.xls", excelRequest.GetTitle());
            var workbook = new NumberGameWorkbook(workbookInfo, resultRecords);
            return workbook.ExportToBytes();
        }

        public async Task<byte[]> ExcelHappy5Result(ExcelRequest excelRequest)
        {
            var request = mapper.Map<ResultRequest>(excelRequest);
            var resultRecords = await resultService.GetHappy5Result(request).ConfigureAwait(false);
            var workbookInfo = CreateWorkbookInfo("Happy5.xls", excelRequest.GetTitle());
            var workbook = new Happy5Workbook(workbookInfo, resultRecords);
            return workbook.ExportToBytes();
        }

        private WorkbookInfo CreateWorkbookInfo(string fileName, string title)
        {
            var filePath = Path.Combine(appSettings.AppDataPath, "ExcelTemplates", "Results", fileName);
            var templateInfo = new TemplateInfo(filePath, bodyStartIndex: 3, freezeRowIndex: 3);
            return new WorkbookInfo(
                templateInfo,
                title,
                localizeService.Localize,
                sharedLocalizer["DefaultSheetName"]
                );
        }
    }
}