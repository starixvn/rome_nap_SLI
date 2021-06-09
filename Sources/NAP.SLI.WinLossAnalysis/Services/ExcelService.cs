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

        public string GetTitle(ExcelRequest request) => $"Win Loss Analysis {request.FromDate.ToDateString()} {request.ToDate.ToDateString()}";

        public async Task<byte[]> ExcelAgent(ExcelRequest request)
        {
            var queryRequest = mapper.Map<QueryRequest>(request);
            var queryData = await queryService.QuerySuper(queryRequest).ConfigureAwait(false);
            var workbook = npoiWorkbookFactory.Create<AgentRecord>();
            var filePath = Path.Combine(appSettings.AppDataPath, "ExcelTemplates", "WinLossAnalysis", "Member.xls");
            workbook.UseTemplate(new TemplateInfo(filePath).FreezePanel(4, Column.B));
            workbook.Title(GetTitle(request));
            workbook.Header(noLocalizer.Localise);
            workbook.Body(queryData.Records, CreateViewAgentMapper(true));
            workbook.Footer(queryData.Total, CreateViewAgentMapper());
            workbook.Sheet(sharedLocalizer["DefaultSheetName"]);
            return workbook.ExportToBytes();
        }

        private static Mapper<AgentRecord> CreateViewAgentMapper(bool isBody = false)
        {
            var mapper = new Mapper<AgentRecord>()
                            .Map(Column.B, x => x.BetCount)
                            .Map(Column.C, x => x.Turnover)
                            .Map(Column.D, x => x.MemberWinLoss)
                            .Map(Column.E, x => x.AgentWinLoss)
                            .Map(Column.F, x => -x.MemberWinLoss + x.AgentWinLoss);
            if (isBody)
            {
                mapper.Map(Column.A, x => x.RollupKey);
            }

            return mapper;
        }

        public async Task<byte[]> ExcelMaster(ExcelRequest request)
        {
            var queryRequest = mapper.Map<QueryRequest>(request);
            var queryData = await queryService.QuerySuper(queryRequest).ConfigureAwait(false);
            var workbook = npoiWorkbookFactory.Create<MasterRecord>();
            var filePath = Path.Combine(appSettings.AppDataPath, "ExcelTemplates", "WinLossAnalysis", "Agent.xls");
            workbook.UseTemplate(new TemplateInfo(filePath).FreezePanel(4, Column.B));
            workbook.Title(GetTitle(request));
            workbook.Header(noLocalizer.Localise);
            workbook.Body(queryData.Records, CreateViewMasterMapper(true));
            workbook.Footer(queryData.Total, CreateViewMasterMapper());
            workbook.Sheet(sharedLocalizer["DefaultSheetName"]);
            return workbook.ExportToBytes();
        }

        private static Mapper<MasterRecord> CreateViewMasterMapper(bool isBody = false)
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
                mapper.Map(Column.A, x => x.RollupKey);
            }

            return mapper;
        }

        public async Task<byte[]> ExcelSuper(ExcelRequest request)
        {
            var queryRequest = mapper.Map<QueryRequest>(request);
            var queryData = await queryService.QuerySuper(queryRequest).ConfigureAwait(false);
            var workbook = npoiWorkbookFactory.Create<SuperRecord>();
            var filePath = Path.Combine(appSettings.AppDataPath, "ExcelTemplates", "WinLossAnalysis", "Master.xls");
            workbook.UseTemplate(new TemplateInfo(filePath).FreezePanel(4, Column.B));
            workbook.Title(GetTitle(request));
            workbook.Header(noLocalizer.Localise);
            workbook.Body(queryData.Records, CreateViewSuperMapper(true));
            workbook.Footer(queryData.Total, CreateViewSuperMapper());
            workbook.Sheet(sharedLocalizer["DefaultSheetName"]);
            return workbook.ExportToBytes();
        }

        private static Mapper<SuperRecord> CreateViewSuperMapper(bool isBody = false)
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
                mapper.Map(Column.A, x => x.RollupKey);
            }

            return mapper;
        }
    }
}