using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Localization;
using NAP.SLI.Common.Models;
using NAP.SLI.Common.Services;
using NAP.SLI.Localization.Services;
using NAP.SLI.Tests;
using NAP.SLI.WinLossDetail.Criteria;
using NAP.SLI.WinLossDetail.Models;
using NAP.SLI.WinLossDetail.Requests;
using NAP.SLI.WinLossDetail.Services;
using NSubstitute;
using ONEbook.SpreadSheets;
using ONEbook.SpreadSheets.NPOI;
using Xunit;

namespace NAP.SLI.WinLossDetail.Tests.Services
{
    public class WinLossDetailExcelServiceTests
    {
        private readonly string appDataPath;
        private readonly LocalizedString defaultSheetName;

        public WinLossDetailExcelServiceTests()
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
            WinLossDetailExcelRequest request,
            Workbook<SuperRecord> workbook,
            (IEnumerable<SuperRecord>, IEnumerable<SuperRecord>) fetchData
        )
        {
            // Arrange
            var winLossDetailExcelService = new WinLossDetailExcelService(reportService, sharedLocalizer, appSettings, dynamicRepositoryEx, npoiWorkbookFactory, noLocalizer);
            reportService.GetBalanceUpDay().Returns(balanceUpDayModel);
            dynamicRepositoryEx.FetchMultipleAsync<SuperRecord, SuperRecord>(Arg.Any<WinLossDetailQueryCriteria>()).Returns(Task.FromResult(fetchData));
            npoiWorkbookFactory.Create<SuperRecord>().Returns(workbook);
            appSettings.AppDataPath.Returns(appDataPath);
            sharedLocalizer["DefaultSheetName"].Returns(defaultSheetName);

            // Act
            var result = await winLossDetailExcelService.ExcelSuper(request);

            // Assert
            await dynamicRepositoryEx.Received().FetchMultipleAsync<SuperRecord, SuperRecord>(Arg.Is<WinLossDetailQueryCriteria>(criteria => IsMatch(criteria, balanceUpDayModel, request)));
            workbook.Received().UseTemplate(Arg.Is<TemplateInfo>(templateInfo => IsMatch(templateInfo, appDataPath, "Master.xls")));
            workbook.Received().Title(Arg.Is<string>(x => x == request.GetExcelTitle()));
            workbook.Received().Header(Arg.Is<Func<string, string>>(x => x == noLocalizer.Localise));
            workbook.Received().Body(Arg.Is<IEnumerable<SuperRecord>>(x => x == fetchData.Item1), Arg.Is<Mapper<SuperRecord>>(mapper => IsMatch(mapper, fetchData.Item1.First(), true)));
            workbook.Received().Footer(Arg.Is<SuperRecord>(x => x == fetchData.Item2.First()), Arg.Is<Mapper<SuperRecord>>(mapper => IsMatch(mapper, fetchData.Item2.First(), false)));
            workbook.Received().Sheet(Arg.Is<string>(x => x == defaultSheetName));
        }

        private static bool IsMatch(Mapper<SuperRecord> mapper, SuperRecord superRecord, bool isBody)
        {
            var a = (decimal)mapper.Mappings[Column.B](superRecord);
            var result = (decimal)mapper.Mappings[Column.B](superRecord) == superRecord.BetCount &&
                (decimal)mapper.Mappings[Column.C](superRecord) == superRecord.Turnover &&
                (decimal)mapper.Mappings[Column.D](superRecord) == superRecord.MemberWinLoss &&
                (decimal)mapper.Mappings[Column.E](superRecord) == superRecord.AgentWinLoss &&
                (decimal)mapper.Mappings[Column.F](superRecord) == superRecord.MasterWinLoss &&
                (decimal)mapper.Mappings[Column.G](superRecord) == superRecord.SuperWinLoss &&
                (decimal)mapper.Mappings[Column.H](superRecord) == -superRecord.MemberWinLoss + superRecord.AgentWinLoss + superRecord.MasterWinLoss + superRecord.SuperWinLoss;
            if (isBody)
            {
                result = result && (string)mapper.Mappings[Column.A](superRecord) == superRecord.Username;
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
            WinLossDetailExcelRequest request,
            Workbook<MasterRecord> workbook,
            (IEnumerable<MasterRecord>, IEnumerable<MasterRecord>) fetchData
        )
        {
            // Arrange
            var winLossDetailExcelService = new WinLossDetailExcelService(reportService, sharedLocalizer, appSettings, dynamicRepositoryEx, npoiWorkbookFactory, noLocalizer);
            reportService.GetBalanceUpDay().Returns(balanceUpDayModel);
            dynamicRepositoryEx.FetchMultipleAsync<MasterRecord, MasterRecord>(Arg.Any<WinLossDetailQueryCriteria>()).Returns(Task.FromResult(fetchData));
            npoiWorkbookFactory.Create<MasterRecord>().Returns(workbook);
            appSettings.AppDataPath.Returns(appDataPath);
            sharedLocalizer["DefaultSheetName"].Returns(defaultSheetName);

            // Act
            var result = await winLossDetailExcelService.ExcelMaster(request);

            // Assert
            await dynamicRepositoryEx.Received().FetchMultipleAsync<MasterRecord, MasterRecord>(Arg.Is<WinLossDetailQueryCriteria>(criteria => IsMatch(criteria, balanceUpDayModel, request)));
            workbook.Received().UseTemplate(Arg.Is<TemplateInfo>(templateInfo => IsMatch(templateInfo, appDataPath, "Agent.xls")));
            workbook.Received().Title(Arg.Is<string>(x => x == request.GetExcelTitle()));
            workbook.Received().Header(Arg.Is<Func<string, string>>(x => x == noLocalizer.Localise));
            workbook.Received().Body(Arg.Is<IEnumerable<MasterRecord>>(x => x == fetchData.Item1), Arg.Is<Mapper<MasterRecord>>(mapper => IsMatch(mapper, fetchData.Item1.First(), true)));
            workbook.Received().Footer(Arg.Is<MasterRecord>(x => x == fetchData.Item2.First()), Arg.Is<Mapper<MasterRecord>>(mapper => IsMatch(mapper, fetchData.Item2.First(), false)));
            workbook.Received().Sheet(Arg.Is<string>(x => x == defaultSheetName));
        }

        private static bool IsMatch(Mapper<MasterRecord> mapper, MasterRecord superRecord, bool isBody)
        {
            var result = (decimal)mapper.Mappings[Column.B](superRecord) == superRecord.BetCount &&
                (decimal)mapper.Mappings[Column.C](superRecord) == superRecord.Turnover &&
                (decimal)mapper.Mappings[Column.D](superRecord) == superRecord.MemberWinLoss &&
                (decimal)mapper.Mappings[Column.E](superRecord) == superRecord.AgentWinLoss &&
                (decimal)mapper.Mappings[Column.F](superRecord) == superRecord.MasterWinLoss &&
                (decimal)mapper.Mappings[Column.G](superRecord) == -superRecord.MemberWinLoss + superRecord.AgentWinLoss + superRecord.MasterWinLoss;
            if (isBody)
            {
                result = result && (string)mapper.Mappings[Column.A](superRecord) == superRecord.Username;
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
            WinLossDetailExcelRequest request,
            Workbook<AgentRecord> workbook,
            (IEnumerable<AgentRecord>, IEnumerable<AgentRecord>) fetchData
        )
        {
            // Arrange
            var winLossDetailExcelService = new WinLossDetailExcelService(reportService, sharedLocalizer, appSettings, dynamicRepositoryEx, npoiWorkbookFactory, noLocalizer);
            reportService.GetBalanceUpDay().Returns(balanceUpDayModel);
            dynamicRepositoryEx.FetchMultipleAsync<AgentRecord, AgentRecord>(Arg.Any<WinLossDetailQueryCriteria>()).Returns(Task.FromResult(fetchData));
            npoiWorkbookFactory.Create<AgentRecord>().Returns(workbook);
            appSettings.AppDataPath.Returns(appDataPath);
            sharedLocalizer["DefaultSheetName"].Returns(defaultSheetName);

            // Act
            var result = await winLossDetailExcelService.ExcelAgent(request);

            // Assert
            await dynamicRepositoryEx.Received().FetchMultipleAsync<AgentRecord, AgentRecord>(Arg.Is<WinLossDetailQueryCriteria>(criteria => IsMatch(criteria, balanceUpDayModel, request)));
            workbook.Received().UseTemplate(Arg.Is<TemplateInfo>(templateInfo => IsMatch(templateInfo, appDataPath, "Member.xls")));
            workbook.Received().Title(Arg.Is<string>(x => x == request.GetExcelTitle()));
            workbook.Received().Header(Arg.Is<Func<string, string>>(x => x == noLocalizer.Localise));
            workbook.Received().Body(Arg.Is<IEnumerable<AgentRecord>>(x => x == fetchData.Item1), Arg.Is<Mapper<AgentRecord>>(mapper => IsMatch(mapper, fetchData.Item1.First(), true)));
            workbook.Received().Footer(Arg.Is<AgentRecord>(x => x == fetchData.Item2.First()), Arg.Is<Mapper<AgentRecord>>(mapper => IsMatch(mapper, fetchData.Item2.First(), false)));
            workbook.Received().Sheet(Arg.Is<string>(x => x == defaultSheetName));
        }

        private static bool IsMatch(Mapper<AgentRecord> mapper, AgentRecord superRecord, bool isBody)
        {
            var result = (decimal)mapper.Mappings[Column.B](superRecord) == superRecord.BetCount &&
                (decimal)mapper.Mappings[Column.C](superRecord) == superRecord.Turnover &&
                (decimal)mapper.Mappings[Column.D](superRecord) == superRecord.MemberWinLoss &&
                (decimal)mapper.Mappings[Column.E](superRecord) == superRecord.AgentWinLoss &&
                (decimal)mapper.Mappings[Column.F](superRecord) == -superRecord.MemberWinLoss + superRecord.AgentWinLoss;
            if (isBody)
            {
                result = result && (string)mapper.Mappings[Column.A](superRecord) == superRecord.Username;
            }

            return result;
        }

        private static bool IsMatch(WinLossDetailQueryCriteria criteria, BalanceUpDayModel balanceUpDayModel, WinLossDetailExcelRequest request)
        {
            return criteria.BalanceUpDay == balanceUpDayModel.BalanceUpDay &&
                criteria.MoveBetsDay == balanceUpDayModel.MoveBetsDay &&
                criteria.CustId == request.CustId &&
                criteria.RoleId == request.RoleId &&
                criteria.FromDate == request.FromDate &&
                criteria.ToDate == request.ToDate &&
                criteria.ProductIds == ((int)Common.Models.ProductIds.NumberGame).ToString() &&
                criteria.IsHistory == request.IsHistory;
        }

        private static bool IsMatch(TemplateInfo templateInfo, string appDataPath, string fileName)
        {
            return templateInfo.TemplatePath == Path.Combine(appDataPath, "ExcelTemplates", "WinLossDetail", fileName) &&
                templateInfo.FreezeRowIndex == 3 &&
                templateInfo.FreezeColumnName == Column.B;
        }
    }
}