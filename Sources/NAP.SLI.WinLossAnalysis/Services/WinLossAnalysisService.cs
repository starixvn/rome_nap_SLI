namespace NAP.SLI.WinLossAnalysis.Services
{ 
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Threading.Tasks;
    using NAP.SLI.Common.Models;
    using NAP.SLI.Common.Services;
    using NAP.SLI.Localization.Services;
    using NAP.SLI.WinLossAnalysis.Criteria;
    using NAP.SLI.WinLossAnalysis.Models;
    using NAP.SLI.WinLossAnalysis.Requests;
    using ONEbook.SpreadSheets;
    using ONEbook.SpreadSheets.NPOI;

    public interface IWinLossAnalysisService {
        Task<QueryModel> Query(WinLossAnalysisQueryRequest request);
        
        Task<byte[]> ExcelViewMaster(WinLossAnalysisExcelRequest request);

        Task<byte[]> ExcelViewAgent(WinLossAnalysisExcelRequest request);

        Task<byte[]> ExcelViewMember(WinLossAnalysisExcelRequest request);
    }

    public class WinLossAnalysisService : IWinLossAnalysisService {
        private readonly IReportService reportService;
        private readonly IDynamicRepositoryEx dynamicRepositoryEx;
        private readonly IAppSettings appSettings;
        private readonly ISharedLocalizer sharedLocalizer;

        public WinLossAnalysisService(IReportService reportService, IDynamicRepositoryEx dynamicRepositoryEx, IAppSettings appSettings, ISharedLocalizer sharedLocalizer){
            this.reportService = reportService;
            this.dynamicRepositoryEx = dynamicRepositoryEx;
            this.appSettings = appSettings;
            this.sharedLocalizer = sharedLocalizer;
        }

        public async Task<QueryModel> Query(WinLossAnalysisQueryRequest request) {
            var balanceUpDayModel = await reportService.GetBalanceUpDay().ConfigureAwait(false);
            var criteria = new QueryWinLossAnalysisCriteria(balanceUpDayModel)
            {
                CustId = request.CustId,
                RoleId = request.RoleId,
                ReportType = request.ReportType,
                FromDate = request.FromDate,
                ToDate = request.ToDate
            };
            return await Query(criteria).ConfigureAwait(false);
        }

         public async Task<byte[]> ExcelViewAgent(WinLossAnalysisExcelRequest request)
        {
            var agentData = await Query(request).ConfigureAwait(false);
            var workbook = new NpoiWorkbook<AgentAnalysisModel>();
            var filePath = Path.Combine(appSettings.AppDataPath, "ExcelTemplates", "WinLossDetail", "Member.xls");
            workbook.UseTemplate(new TemplateInfo(filePath).FreezePanel(4, Column.B));
            workbook.Title(request.GetExcelTitle());
            workbook.Header(key => key);
            workbook.Body(agentData.Records as IEnumerable<AgentAnalysisModel>, CreateViewAgentMapper(true));
            workbook.Footer(agentData.Total as AgentAnalysisModel, CreateViewAgentMapper());
            workbook.Sheet(sharedLocalizer["DefaultSheetName"]);
            return workbook.ExportToBytes();
        }

        private Mapper<AgentAnalysisModel> CreateViewAgentMapper(bool isBody = false)
        {
            var mapper = new Mapper<AgentAnalysisModel>()
                            .Map(Column.B, x => x.BetCount)
                            .Map(Column.C, x => x.Turnover)
                            .Map(Column.D, x => x.MemberWinLoss)
                            .Map(Column.E, x => x.AgentWinLoss)
                            .Map(Column.F, x => x.MemberWinLoss + x.AgentWinLoss);
            if (isBody)
            {
                mapper.Map(Column.A, x => x.RollupKey);
            }

            return mapper;
        }

        public async Task<byte[]> ExcelViewMaster(WinLossAnalysisExcelRequest request)
        {
            var agentData = await Query(request).ConfigureAwait(false);
            var workbook = new NpoiWorkbook<MasterAnalysisModel>();
            var filePath = Path.Combine(appSettings.AppDataPath, "ExcelTemplates", "WinLossAnalysis", "Agent.xls");
            workbook.UseTemplate(new TemplateInfo(filePath).FreezePanel(4, Column.B));
            workbook.Title(request.GetExcelTitle());
            workbook.Header(key => key);
            workbook.Body(agentData.Records as IEnumerable<MasterAnalysisModel>, CreateViewMasterMapper(true));
            workbook.Footer(agentData.Total as MasterAnalysisModel, CreateViewMasterMapper());
            workbook.Sheet(sharedLocalizer["DefaultSheetName"]);
            return workbook.ExportToBytes();
        }

        private Mapper<MasterAnalysisModel> CreateViewMasterMapper(bool isBody = false)
        {
            var mapper = new Mapper<MasterAnalysisModel>()
                            .Map(Column.B, x => x.BetCount)
                            .Map(Column.C, x => x.Turnover)
                            .Map(Column.D, x => x.MemberWinLoss)
                            .Map(Column.E, x => x.AgentWinLoss)
                            .Map(Column.F, x => x.MasterWinLoss)
                            .Map(Column.G, x => x.MemberWinLoss + x.AgentWinLoss + x.MasterWinLoss);
            if (isBody)
            {
                mapper.Map(Column.A, x => x.RollupKey);
            }

            return mapper;
        }

        public async Task<byte[]> ExcelViewMember(WinLossAnalysisExcelRequest request)
        {
            var agentData = await Query(request).ConfigureAwait(false);
            var workbook = new NpoiWorkbook<SuperAnalysisModel>();
            var filePath = Path.Combine(appSettings.AppDataPath, "ExcelTemplates", "WinLossAnalysis", "Master.xls");
            workbook.UseTemplate(new TemplateInfo(filePath).FreezePanel(4, Column.B));
            workbook.Title(request.GetExcelTitle());
            workbook.Header(key => key);
            workbook.Body(agentData.Records as IEnumerable<SuperAnalysisModel>, CreateViewSuperMapper(true));
            workbook.Footer(agentData.Total as SuperAnalysisModel, CreateViewSuperMapper());
            workbook.Sheet(sharedLocalizer["DefaultSheetName"]);
            return workbook.ExportToBytes();
        }

        private Mapper<SuperAnalysisModel> CreateViewSuperMapper(bool isBody = false)
        {
            var mapper = new Mapper<SuperAnalysisModel>()
                            .Map(Column.B, x => x.BetCount)
                            .Map(Column.C, x => x.Turnover)
                            .Map(Column.D, x => x.MemberWinLoss)
                            .Map(Column.G, x => x.AgentWinLoss)
                            .Map(Column.H, x => x.MasterWinLoss)
                            .Map(Column.I, x => x.SuperWinLoss)
                            .Map(Column.J, x => x.MemberWinLoss + x.AgentWinLoss + x.MasterWinLoss + x.SuperWinLoss);
            if (isBody)
            {
                mapper.Map(Column.A, x => x.RollupKey);
            }

            return mapper;
        }

        private async Task<QueryModel> Query(WinLossAnalysisExcelRequest request)
        {
            var balanceUpDayModel = await reportService.GetBalanceUpDay().ConfigureAwait(false);
            var criteria = new QueryWinLossAnalysisCriteria(balanceUpDayModel)
            {
                CustId = request.CustId,
                RoleId = request.RoleId,
                ReportType = request.ReportType,
                FromDate = request.FromDate,
                ToDate = request.ToDate
            };
            return await Query(criteria).ConfigureAwait(false);
        }

        private async Task<QueryModel> Query(QueryWinLossAnalysisCriteria criteria)
        {
            (IEnumerable<object> firstResultSet, IEnumerable<object> secondResultSet) result;
            switch (criteria.RoleId)
            {
                case (int)CustomerLevels.Super:
                    result = await dynamicRepositoryEx.FetchMultipleAsync<SuperAnalysisModel, SuperAnalysisModel>(criteria).ConfigureAwait(false);
                    break;
                case (int)CustomerLevels.Master:
                    result = await dynamicRepositoryEx.FetchMultipleAsync<MasterAnalysisModel, SuperAnalysisModel>(criteria).ConfigureAwait(false);
                    break;
                case (int)CustomerLevels.Agent:
                    result = await dynamicRepositoryEx.FetchMultipleAsync<AgentAnalysisModel, SuperAnalysisModel>(criteria).ConfigureAwait(false);
                    break;
                default:
                    throw new NotImplementedException();
            }

            return new QueryModel
            {
                Records = result.firstResultSet,
                Total = result.secondResultSet.First(),
            };
        }
    }
}