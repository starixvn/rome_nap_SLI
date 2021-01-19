namespace NAP.SLI.WinLossAnalysis.Tests.Services
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Threading.Tasks;
    using AutoFixture;
    using Microsoft.Extensions.Localization;
    using NAP.SLI.Common.Models;
    using NAP.SLI.Common.Services;
    using NAP.SLI.Localization.Services;
    using NAP.SLI.Tests;
    using NAP.SLI.WinLossAnalysis.Criteria;
    using NAP.SLI.WinLossAnalysis.Models;
    using NAP.SLI.WinLossAnalysis.Requests;
    using NAP.SLI.WinLossAnalysis.Services;
    using NSubstitute;
    using ONEbook.SpreadSheets;
    using ONEbook.SpreadSheets.NPOI;
    using Xunit;

    public class WinLossAnalysisServiceTests
    {
        private readonly string appDataPath;
        private readonly LocalizedString defaultSheetName;

        public WinLossAnalysisServiceTests()
        {
            appDataPath = nameof(appDataPath);
            defaultSheetName = new LocalizedString(nameof(defaultSheetName), nameof(defaultSheetName));
        }

        [Theory]
        [AutoDomainData]
        public async Task TestMethod_ExcelSuper(
            IReportService reportService,
            ISharedLocalizer sharedLocalizer,
            INoLocalizer noLocalizer,
            IAppSettings appSettings,
            IDynamicRepositoryEx dynamicRepositoryEx,
            INpoiWorkbookFactory npoiWorkbookFactory,
            BalanceUpDayModel balanceUpDayModel,
            Workbook<SuperAnalysisModel> workbook,
            (IEnumerable<SuperAnalysisModel>, IEnumerable<SuperAnalysisModel>) fetchData
        )
        {
            // Arrange
            var winLossAnalysisService = new WinLossAnalysisService(reportService, dynamicRepositoryEx, appSettings, sharedLocalizer, noLocalizer, npoiWorkbookFactory);
            var request = CreateExcelRequestByRole(CustomerLevels.Super);
            reportService.GetBalanceUpDay().Returns(balanceUpDayModel);
            dynamicRepositoryEx.FetchMultipleAsync<SuperAnalysisModel, SuperAnalysisModel>(Arg.Any<WinLossAnalysisQueryCriteria>()).Returns(Task.FromResult(fetchData));
            npoiWorkbookFactory.Create<SuperAnalysisModel>().Returns(workbook);
            appSettings.AppDataPath.Returns(appDataPath);
            sharedLocalizer["DefaultSheetName"].Returns(defaultSheetName);

            // Act
            var result = await winLossAnalysisService.ExcelViewSuper(request);

            // Assert
            await dynamicRepositoryEx.Received().FetchMultipleAsync<SuperAnalysisModel, SuperAnalysisModel>(Arg.Is<WinLossAnalysisQueryCriteria>(criteria => IsMatch(criteria, balanceUpDayModel, request)));
            workbook.Received().UseTemplate(Arg.Is<TemplateInfo>(templateInfo => IsMatch(templateInfo, appDataPath, "Master.xls")));
            workbook.Received().Title(Arg.Is<string>(x => x == request.GetExcelTitle()));
            workbook.Received().Header(Arg.Is<Func<string, string>>(x => x == noLocalizer.Localise));
            workbook.Received().Body(Arg.Is<IEnumerable<SuperAnalysisModel>>(x => x == fetchData.Item1), Arg.Is<Mapper<SuperAnalysisModel>>(mapper => IsMatch(mapper, fetchData.Item1.First(), true)));
            workbook.Received().Footer(Arg.Is<SuperAnalysisModel>(x => x == fetchData.Item2.First()), Arg.Is<Mapper<SuperAnalysisModel>>(mapper => IsMatch(mapper, fetchData.Item2.First(), false)));
            workbook.Received().Sheet(Arg.Is<string>(x => x == defaultSheetName));
        }

        private bool IsMatch(Mapper<SuperAnalysisModel> mapper, SuperAnalysisModel superRecord, bool isBody)
        {
            var result = (int)mapper.Mappings[Column.B](superRecord) == superRecord.BetCount &&
                (decimal)mapper.Mappings[Column.C](superRecord) == superRecord.Turnover &&
                (decimal)mapper.Mappings[Column.D](superRecord) == superRecord.MemberWinLoss &&
                (decimal)mapper.Mappings[Column.E](superRecord) == superRecord.AgentWinLoss &&
                (decimal)mapper.Mappings[Column.F](superRecord) == superRecord.MasterWinLoss &&
                (decimal)mapper.Mappings[Column.G](superRecord) == superRecord.SuperWinLoss &&
                (decimal)mapper.Mappings[Column.H](superRecord) == -superRecord.MemberWinLoss + superRecord.AgentWinLoss + superRecord.MasterWinLoss + superRecord.SuperWinLoss;
            if (isBody)
            {
                result = result && (string)mapper.Mappings[Column.A](superRecord) == superRecord.RollupKey;
            }

            return result;
        }

        [Theory]
        [AutoDomainData]
        public async Task TestMethod_ExcelMaster(
            IReportService reportService,
            ISharedLocalizer sharedLocalizer,
            INoLocalizer noLocalizer,
            IAppSettings appSettings,
            IDynamicRepositoryEx dynamicRepositoryEx,
            INpoiWorkbookFactory npoiWorkbookFactory,
            BalanceUpDayModel balanceUpDayModel,
            Workbook<MasterAnalysisModel> workbook,
            (IEnumerable<MasterAnalysisModel>, IEnumerable<MasterAnalysisModel>) fetchData
        )
        {
            // Arrange
            var winLossAnalysisService = new WinLossAnalysisService(reportService, dynamicRepositoryEx, appSettings, sharedLocalizer, noLocalizer, npoiWorkbookFactory);
            var request = CreateExcelRequestByRole(CustomerLevels.Master);
            reportService.GetBalanceUpDay().Returns(balanceUpDayModel);
            dynamicRepositoryEx.FetchMultipleAsync<MasterAnalysisModel, MasterAnalysisModel>(Arg.Any<WinLossAnalysisQueryCriteria>()).Returns(Task.FromResult(fetchData));
            npoiWorkbookFactory.Create<MasterAnalysisModel>().Returns(workbook);
            appSettings.AppDataPath.Returns(appDataPath);
            sharedLocalizer["DefaultSheetName"].Returns(defaultSheetName);

            // Act
            var result = await winLossAnalysisService.ExcelViewMaster(request);

            // Assert
            await dynamicRepositoryEx.Received().FetchMultipleAsync<MasterAnalysisModel, MasterAnalysisModel>(Arg.Is<WinLossAnalysisQueryCriteria>(criteria => IsMatch(criteria, balanceUpDayModel, request)));
            workbook.Received().UseTemplate(Arg.Is<TemplateInfo>(templateInfo => IsMatch(templateInfo, appDataPath, "Agent.xls")));
            workbook.Received().Title(Arg.Is<string>(x => x == request.GetExcelTitle()));
            workbook.Received().Header(Arg.Is<Func<string, string>>(x => x == noLocalizer.Localise));
            workbook.Received().Body(Arg.Is<IEnumerable<MasterAnalysisModel>>(x => x == fetchData.Item1), Arg.Is<Mapper<MasterAnalysisModel>>(mapper => IsMatch(mapper, fetchData.Item1.First(), true)));
            workbook.Received().Footer(Arg.Is<MasterAnalysisModel>(x => x == fetchData.Item2.First()), Arg.Is<Mapper<MasterAnalysisModel>>(mapper => IsMatch(mapper, fetchData.Item2.First(), false)));
            workbook.Received().Sheet(Arg.Is<string>(x => x == defaultSheetName));
        }

        private bool IsMatch(Mapper<MasterAnalysisModel> mapper, MasterAnalysisModel masterRecord, bool isBody)
        {
            var result = (int)mapper.Mappings[Column.B](masterRecord) == masterRecord.BetCount &&
                (decimal)mapper.Mappings[Column.C](masterRecord) == masterRecord.Turnover &&
                (decimal)mapper.Mappings[Column.D](masterRecord) == masterRecord.MemberWinLoss &&
                (decimal)mapper.Mappings[Column.E](masterRecord) == masterRecord.AgentWinLoss &&
                (decimal)mapper.Mappings[Column.F](masterRecord) == masterRecord.MasterWinLoss &&
                (decimal)mapper.Mappings[Column.G](masterRecord) == -masterRecord.MemberWinLoss + masterRecord.AgentWinLoss + masterRecord.MasterWinLoss;
            if (isBody)
            {
                result = result && (string)mapper.Mappings[Column.A](masterRecord) == masterRecord.RollupKey;
            }

            return result;
        }

        [Theory]
        [AutoDomainData]
        public async Task TestMethod_ExcelAgent(
            IReportService reportService,
            ISharedLocalizer sharedLocalizer,
            INoLocalizer noLocalizer,
            IAppSettings appSettings,
            IDynamicRepositoryEx dynamicRepositoryEx,
            INpoiWorkbookFactory npoiWorkbookFactory,
            BalanceUpDayModel balanceUpDayModel,
            Workbook<AgentAnalysisModel> workbook,
            (IEnumerable<AgentAnalysisModel>, IEnumerable<AgentAnalysisModel>) fetchData
        )
        {
            // Arrange
            var winLossAnalysisService = new WinLossAnalysisService(reportService, dynamicRepositoryEx, appSettings, sharedLocalizer, noLocalizer, npoiWorkbookFactory);
            var request = CreateExcelRequestByRole(CustomerLevels.Agent);
            reportService.GetBalanceUpDay().Returns(balanceUpDayModel);
            dynamicRepositoryEx.FetchMultipleAsync<AgentAnalysisModel, AgentAnalysisModel>(Arg.Any<WinLossAnalysisQueryCriteria>()).Returns(Task.FromResult(fetchData));
            npoiWorkbookFactory.Create<AgentAnalysisModel>().Returns(workbook);
            appSettings.AppDataPath.Returns(appDataPath);
            sharedLocalizer["DefaultSheetName"].Returns(defaultSheetName);

            // Act
            var result = await winLossAnalysisService.ExcelViewAgent(request);

            // Assert
            await dynamicRepositoryEx.Received().FetchMultipleAsync<AgentAnalysisModel, AgentAnalysisModel>(Arg.Is<WinLossAnalysisQueryCriteria>(criteria => IsMatch(criteria, balanceUpDayModel, request)));
            workbook.Received().UseTemplate(Arg.Is<TemplateInfo>(templateInfo => IsMatch(templateInfo, appDataPath, "Member.xls")));
            workbook.Received().Title(Arg.Is<string>(x => x == request.GetExcelTitle()));
            workbook.Received().Header(Arg.Is<Func<string, string>>(x => x == noLocalizer.Localise));
            workbook.Received().Body(Arg.Is<IEnumerable<AgentAnalysisModel>>(x => x == fetchData.Item1), Arg.Is<Mapper<AgentAnalysisModel>>(mapper => IsMatch(mapper, fetchData.Item1.First(), true)));
            workbook.Received().Footer(Arg.Is<AgentAnalysisModel>(x => x == fetchData.Item2.First()), Arg.Is<Mapper<AgentAnalysisModel>>(mapper => IsMatch(mapper, fetchData.Item2.First(), false)));
            workbook.Received().Sheet(Arg.Is<string>(x => x == defaultSheetName));
        }

        private bool IsMatch(Mapper<AgentAnalysisModel> mapper, AgentAnalysisModel agentRecord, bool isBody)
        {
            var result = (int)mapper.Mappings[Column.B](agentRecord) == agentRecord.BetCount &&
                (decimal)mapper.Mappings[Column.C](agentRecord) == agentRecord.Turnover &&
                (decimal)mapper.Mappings[Column.D](agentRecord) == agentRecord.MemberWinLoss &&
                (decimal)mapper.Mappings[Column.E](agentRecord) == agentRecord.AgentWinLoss &&
                (decimal)mapper.Mappings[Column.F](agentRecord) == -agentRecord.MemberWinLoss + agentRecord.AgentWinLoss;
            if (isBody)
            {
                result = result && (string)mapper.Mappings[Column.A](agentRecord) == agentRecord.RollupKey;
            }

            return result;
        }

        private bool IsMatch(WinLossAnalysisQueryCriteria criteria, BalanceUpDayModel balanceUpDayModel, WinLossAnalysisExcelRequest request)
        {
            return criteria.BalanceUpDay == balanceUpDayModel.BalanceUpDay &&
                criteria.MoveBetsDay == balanceUpDayModel.MoveBetsDay &&
                criteria.CustId == request.CustId &&
                criteria.RoleId == request.RoleId &&
                criteria.ReportType == request.ReportType &&
                criteria.FromDate == request.FromDate &&
                criteria.ToDate == request.ToDate;
        }

        private bool IsMatch(TemplateInfo templateInfo, string appDataPath, string fileName)
        {
            return templateInfo.TemplatePath == Path.Combine(appDataPath, "ExcelTemplates", "WinLossAnalysis", fileName) &&
                templateInfo.FreezeRowIndex == 3 &&
                templateInfo.FreezeColumnName == Column.B;
        }

        private WinLossAnalysisExcelRequest CreateExcelRequestByRole(CustomerLevels role)
        {
            var fixture = new Fixture();
            var request = fixture.Build<WinLossAnalysisExcelRequest>()
                .With(c => c.RoleId, (int)role)
                .Create();

            return request;
        }
    }
}