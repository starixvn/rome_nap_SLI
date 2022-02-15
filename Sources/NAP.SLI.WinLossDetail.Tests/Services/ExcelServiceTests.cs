using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.Extensions.Localization;
using NAP.SLI.Common.Extensions;
using NAP.SLI.Common.Services;
using NAP.SLI.Localization.Services;
using NAP.SLI.Tests;
using NAP.SLI.WinLossDetail.Extensions;
using NAP.SLI.WinLossDetail.Models;
using NAP.SLI.WinLossDetail.Requests;
using NAP.SLI.WinLossDetail.Services;
using NSubstitute;
using ONEbook.SpreadSheets;
using ONEbook.SpreadSheets.NPOI;
using Xunit;

namespace NAP.SLI.WinLossDetail.Tests.Services
{
    public class ExcelServiceTests
    {
        private readonly string appDataPath;
        private readonly LocalizedString defaultSheetName;

        public ExcelServiceTests()
        {
            appDataPath = nameof(appDataPath);
            defaultSheetName = new LocalizedString(nameof(defaultSheetName), nameof(defaultSheetName));
        }

        [Theory]
        [AutoDomainData]
        public async Task TestMethod_ExcelSuper(
            IQueryService queryService,
            IMapper mapper,
            ISharedLocalizer sharedLocalizer,
            INoLocalizer noLocalizer,
            IAppSettings appSettings,
            INpoiWorkbookFactory npoiWorkbookFactory,
            ExcelRequest request,
            Workbook<SuperRecordEx> workbook,
            SuperData superData
        )
        {
            // Arrange
            var excelService = new ExcelService(queryService, sharedLocalizer, appSettings, npoiWorkbookFactory, noLocalizer, mapper);
            queryService.QuerySuper(Arg.Any<QueryRequest>()).Returns(superData);
            npoiWorkbookFactory.Create<SuperRecordEx>().Returns(workbook);
            appSettings.AppDataPath.Returns(appDataPath);
            sharedLocalizer["DefaultSheetName"].Returns(defaultSheetName);

            // Act
            var result = await excelService.ExcelSuper(request).ConfigureAwait(false);

            // Assert
            await queryService.Received().QuerySuper(Arg.Any<QueryRequest>());
            workbook.Received().UseTemplate(Arg.Is<TemplateInfo>(templateInfo => IsMatch(templateInfo, appDataPath, "Master.xls")));
            workbook.Received().Title(Arg.Is<string>(x => x == request.GetTitle()));
            workbook.Received().Body(Arg.Is<IEnumerable<SuperRecordEx>>(x => x == superData.Records), Arg.Is<Mapper<SuperRecordEx>>(mapper => IsMatch(mapper, superData.Records.First(), true)));
            workbook.Received().Footer(Arg.Is<SuperRecordEx>(x => x == superData.Total), Arg.Is<Mapper<SuperRecordEx>>(mapper => IsMatch(mapper, superData.Total, false)));
            workbook.Received().Sheet(Arg.Is<string>(x => x == defaultSheetName));
        }

        private static bool IsMatch(Mapper<SuperRecordEx> mapper, SuperRecordEx superRecord, bool isBody)
        {
            var a = (decimal)mapper.Mappings[Column.B](superRecord);
            var result = (decimal)mapper.Mappings[Column.B](superRecord) == superRecord.BetCount &&
                (decimal)mapper.Mappings[Column.C](superRecord) == superRecord.Turnover &&
                (decimal)mapper.Mappings[Column.D](superRecord) == superRecord.MemberWinLoss &&
                (decimal)mapper.Mappings[Column.E](superRecord) == superRecord.AgentWinLoss &&
                (decimal)mapper.Mappings[Column.F](superRecord) == superRecord.MasterWinLoss &&
                (decimal)mapper.Mappings[Column.G](superRecord) == superRecord.SuperWinLoss &&
                (decimal)mapper.Mappings[Column.H](superRecord) == superRecord.CompanyWinLoss;
            if (isBody)
            {
                result = result && (string)mapper.Mappings[Column.A](superRecord) == superRecord.Username;
            }

            return result;
        }

        [Theory]
        [AutoDomainData]
        public async Task TestMethod_ExcelMaster(
            IQueryService queryService,
            IMapper mapper,
            ISharedLocalizer sharedLocalizer,
            INoLocalizer noLocalizer,
            IAppSettings appSettings,
            INpoiWorkbookFactory npoiWorkbookFactory,
            ExcelRequest request,
            Workbook<MasterRecordEx> workbook,
            MasterData masterData
        )
        {
            // Arrange
            var excelService = new ExcelService(queryService, sharedLocalizer, appSettings, npoiWorkbookFactory, noLocalizer, mapper);
            queryService.QueryMaster(Arg.Any<QueryRequest>()).Returns(masterData);
            npoiWorkbookFactory.Create<MasterRecordEx>().Returns(workbook);
            appSettings.AppDataPath.Returns(appDataPath);
            sharedLocalizer["DefaultSheetName"].Returns(defaultSheetName);

            // Act
            var result = await excelService.ExcelMaster(request);

            // Assert
            await queryService.Received().QueryMaster(Arg.Any<QueryRequest>());
            workbook.Received().UseTemplate(Arg.Is<TemplateInfo>(templateInfo => IsMatch(templateInfo, appDataPath, "Agent.xls")));
            workbook.Received().Title(Arg.Is<string>(x => x == request.GetTitle()));
            workbook.Received().Body(Arg.Is<IEnumerable<MasterRecordEx>>(x => x == masterData.Records), Arg.Is<Mapper<MasterRecordEx>>(mapper => IsMatch(mapper, masterData.Records.First(), true)));
            workbook.Received().Footer(Arg.Is<MasterRecordEx>(x => x == masterData.Total), Arg.Is<Mapper<MasterRecordEx>>(mapper => IsMatch(mapper, masterData.Total, false)));
            workbook.Received().Sheet(Arg.Is<string>(x => x == defaultSheetName));
        }

        private static bool IsMatch(Mapper<MasterRecordEx> mapper, MasterRecordEx superRecord, bool isBody)
        {
            var result = (decimal)mapper.Mappings[Column.B](superRecord) == superRecord.BetCount &&
                (decimal)mapper.Mappings[Column.C](superRecord) == superRecord.Turnover &&
                (decimal)mapper.Mappings[Column.D](superRecord) == superRecord.MemberWinLoss &&
                (decimal)mapper.Mappings[Column.E](superRecord) == superRecord.AgentWinLoss &&
                (decimal)mapper.Mappings[Column.F](superRecord) == superRecord.MasterWinLoss &&
                (decimal)mapper.Mappings[Column.G](superRecord) == superRecord.CompanyWinLoss;
            if (isBody)
            {
                result = result && (string)mapper.Mappings[Column.A](superRecord) == superRecord.Username;
            }

            return result;
        }

        [Theory]
        [AutoDomainData]
        public async Task TestMethod_ExcelAgent(
            IQueryService queryService,
            IMapper mapper,
            ISharedLocalizer sharedLocalizer,
            INoLocalizer noLocalizer,
            IAppSettings appSettings,
            INpoiWorkbookFactory npoiWorkbookFactory,
            ExcelRequest request,
            Workbook<AgentRecordEx> workbook,
            AgentData agentData
        )
        {
            // Arrange
            var excelService = new ExcelService(queryService, sharedLocalizer, appSettings, npoiWorkbookFactory, noLocalizer, mapper);
            queryService.QueryAgent(Arg.Any<QueryRequest>()).Returns(agentData);
            npoiWorkbookFactory.Create<AgentRecordEx>().Returns(workbook);
            appSettings.AppDataPath.Returns(appDataPath);
            sharedLocalizer["DefaultSheetName"].Returns(defaultSheetName);

            // Act
            var result = await excelService.ExcelAgent(request);

            // Assert
            await queryService.Received().QueryAgent(Arg.Any<QueryRequest>());
            workbook.Received().UseTemplate(Arg.Is<TemplateInfo>(templateInfo => IsMatch(templateInfo, appDataPath, "Member.xls")));
            workbook.Received().Title(Arg.Is<string>(x => x == request.GetTitle()));
            workbook.Received().Body(Arg.Is<IEnumerable<AgentRecordEx>>(x => x == agentData.Records), Arg.Is<Mapper<AgentRecordEx>>(mapper => IsMatch(mapper, agentData.Records.First(), true)));
            workbook.Received().Footer(Arg.Is<AgentRecordEx>(x => x == agentData.Total), Arg.Is<Mapper<AgentRecordEx>>(mapper => IsMatch(mapper, agentData.Total, false)));
            workbook.Received().Sheet(Arg.Is<string>(x => x == defaultSheetName));
        }

        private static bool IsMatch(Mapper<AgentRecordEx> mapper, AgentRecordEx superRecord, bool isBody)
        {
            var result = (decimal)mapper.Mappings[Column.B](superRecord) == superRecord.BetCount &&
                (decimal)mapper.Mappings[Column.C](superRecord) == superRecord.Turnover &&
                (decimal)mapper.Mappings[Column.D](superRecord) == superRecord.MemberWinLoss &&
                (decimal)mapper.Mappings[Column.E](superRecord) == superRecord.AgentWinLoss &&
                (decimal)mapper.Mappings[Column.F](superRecord) == superRecord.CompanyWinLoss;
            if (isBody)
            {
                result = result && (string)mapper.Mappings[Column.A](superRecord) == superRecord.Username;
            }

            return result;
        }

        private static bool IsMatch(TemplateInfo templateInfo, string appDataPath, string fileName)
        {
            return templateInfo.TemplatePath == Path.Combine(appDataPath, "ExcelTemplates", "WinLossDetail", fileName) &&
                templateInfo.FreezeRowIndex == 3 &&
                templateInfo.FreezeColumnName == Column.B;
        }
    }
}