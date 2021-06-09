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
            var workbook = npoiWorkbookFactory.Create<SuperRecord>();
            var filePath = Path.Combine(appSettings.AppDataPath, "ExcelTemplates", "MatchWinLossDetail", "Master.xls");
            workbook.UseTemplate(new TemplateInfo(filePath).FreezePanel(4, Column.B))
                .Title(GetTitle(request))
                .Header(noLocalizer.Localise)
                .Sheet(sharedLocalizer["DefaultSheetName"]);
            workbook.Body(queryData.Records, CreateViewMasterMapper(true));
            return workbook.ExportToBytes();
        }

        private static Mapper<SuperRecord> CreateViewMasterMapper(bool isBody)
        {
            var mapper = new Mapper<SuperRecord>()
                // .Map(Column.B, x => x.BetCount)
                .Map(Column.C, x => x.Turnover)
                .Map(Column.D, x => x.MemberWinLoss)
                .Map(Column.E, x => x.AgentWinLoss)
                .Map(Column.F, x => x.MasterWinLoss)
                .Map(Column.G, x => x.SuperWinLoss)
                .Map(Column.H, x => -x.MemberWinLoss + x.AgentWinLoss + x.MasterWinLoss + x.SuperWinLoss);
            if (isBody)
            {
                // mapper.Map(Column.A, x => x.Username);
            }

            return mapper;
        }

        public async Task<byte[]> ExcelMaster(ExcelRequest request)
        {
            var queryRequest = mapper.Map<QueryRequest>(request);
            var queryData = await queryService.QueryMaster(queryRequest).ConfigureAwait(false);
            var workbook = npoiWorkbookFactory.Create<MasterRecord>();
            var filePath = Path.Combine(appSettings.AppDataPath, "ExcelTemplates", "WinLossDetail", "Agent.xls");
            workbook.UseTemplate(new TemplateInfo(filePath).FreezePanel(4, Column.B));
            workbook.Title(GetTitle(request));
            workbook.Header(noLocalizer.Localise);
            workbook.Body(queryData.Records, CreateViewAgentMapper(true));
            // workbook.Footer(Total, CreateViewAgentMapper(false));
            workbook.Sheet(sharedLocalizer["DefaultSheetName"]);
            return workbook.ExportToBytes();
        }

        private static string GetTitle(ExcelRequest request)
        {
            return $"Win Loss Detail {request.FromDate.ToDateString()} {request.ToDate.ToDateString()}";
        }

        private static Mapper<MasterRecord> CreateViewAgentMapper(bool isBody)
        {
            var mapper = new Mapper<MasterRecord>()
                // .Map(Column.B, x => x.BetCount)
                .Map(Column.C, x => x.Turnover)
                .Map(Column.D, x => x.MemberWinLoss)
                .Map(Column.E, x => x.AgentWinLoss)
                .Map(Column.F, x => x.MasterWinLoss)
                .Map(Column.G, x => -x.MemberWinLoss + x.AgentWinLoss + x.MasterWinLoss);
            if (isBody)
            {
                // mapper.Map(Column.A, x => x.Username);
            }

            return mapper;
        }

        public async Task<byte[]> ExcelAgent(ExcelRequest request)
        {
            var queryRequest = mapper.Map<QueryRequest>(request);
            var queryData = await queryService.QueryAgent(queryRequest).ConfigureAwait(false);
            var workbook = npoiWorkbookFactory.Create<AgentRecord>();
            var filePath = Path.Combine(appSettings.AppDataPath, "ExcelTemplates", "WinLossDetail", "Member.xls");
            workbook.UseTemplate(new TemplateInfo(filePath).FreezePanel(4, Column.B));
            workbook.Title(GetTitle(request));
            workbook.Header(noLocalizer.Localise);
            workbook.Body(queryData.Records, CreateViewMemberMapper(true));
            // workbook.Footer(Total, CreateViewMemberMapper(false));
            workbook.Sheet(sharedLocalizer["DefaultSheetName"]);
            return workbook.ExportToBytes();
        }

        private static Mapper<AgentRecord> CreateViewMemberMapper(bool isBody)
        {
            var mapper = new Mapper<AgentRecord>()
                // .Map(Column.B, x => x.BetCount)
                .Map(Column.C, x => x.Turnover)
                .Map(Column.D, x => x.MemberWinLoss)
                .Map(Column.E, x => x.AgentWinLoss)
                .Map(Column.F, x => -x.MemberWinLoss + x.AgentWinLoss);
            if (isBody)
            {
                // mapper.Map(Column.A, x => x.Username);
            }

            return mapper;
        }
    }
}