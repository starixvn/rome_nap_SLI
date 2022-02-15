namespace NAP.SLI.WinLossAnalysis.Tests.Services
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Threading.Tasks;
    using AutoFixture;
    using AutoMapper;
    using Microsoft.Extensions.Localization;
    using NAP.SLI.Common.Extensions;
    using NAP.SLI.Common.Models;
    using NAP.SLI.Common.Services;
    using NAP.SLI.Localization.Services;
    using NAP.SLI.Tests;
    using NAP.SLI.WinLossAnalysis.Criteria;
    using NAP.SLI.WinLossAnalysis.Extensions;
    using NAP.SLI.WinLossAnalysis.Models;
    using NAP.SLI.WinLossAnalysis.Requests;
    using NAP.SLI.WinLossAnalysis.Services;
    using NSubstitute;
    using ONEbook.SpreadSheets;
    using ONEbook.SpreadSheets.NPOI;
    using Xunit;

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
            Workbook<SuperRecordEx> workbook,
            ExcelRequest request,
            SuperData superData
        )
        {
            // Arrange
            var excelService = new ExcelService(queryService, appSettings, sharedLocalizer, noLocalizer, npoiWorkbookFactory, mapper);
            queryService.QuerySuper(Arg.Any<QueryRequest>()).Returns(superData);
            npoiWorkbookFactory.Create<SuperRecordEx>().Returns(workbook);
            appSettings.AppDataPath.Returns(appDataPath);
            sharedLocalizer["DefaultSheetName"].Returns(defaultSheetName);

            // Act
            var result = await excelService.ExcelSuper(request);

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
            var result = (int)mapper.Mappings[Column.B](superRecord) == superRecord.BetCount &&
                (decimal)mapper.Mappings[Column.C](superRecord) == superRecord.Turnover &&
                (decimal)mapper.Mappings[Column.D](superRecord) == superRecord.MemberWinLoss &&
                (decimal)mapper.Mappings[Column.E](superRecord) == superRecord.AgentWinLoss &&
                (decimal)mapper.Mappings[Column.F](superRecord) == superRecord.MasterWinLoss &&
                (decimal)mapper.Mappings[Column.G](superRecord) == superRecord.SuperWinLoss &&
                (decimal)mapper.Mappings[Column.H](superRecord) == superRecord.CompanyWinLoss;
            if (isBody)
            {
                result = result && (string)mapper.Mappings[Column.A](superRecord) == superRecord.RollupKey;
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
            Workbook<MasterRecordEx> workbook,
            ExcelRequest request,
            MasterData masterData
        )
        {
            // Arrange
            var excelService = new ExcelService(queryService, appSettings, sharedLocalizer, noLocalizer, npoiWorkbookFactory, mapper);
            queryService.QueryMaster(Arg.Any<QueryRequest>()).Returns(masterData);
            npoiWorkbookFactory.Create<MasterRecordEx>().Returns(workbook);
            appSettings.AppDataPath.Returns(appDataPath);
            sharedLocalizer["DefaultSheetName"].Returns(defaultSheetName);

            // Act
            var result = await excelService.ExcelMaster(request).ConfigureAwait(false);

            // Assert
            await queryService.Received().QueryMaster(Arg.Any<QueryRequest>());
            workbook.Received().UseTemplate(Arg.Is<TemplateInfo>(templateInfo => IsMatch(templateInfo, appDataPath, "Agent.xls")));
            workbook.Received().Title(Arg.Is<string>(x => x == request.GetTitle()));
            workbook.Received().Body(Arg.Is<IEnumerable<MasterRecordEx>>(x => x == masterData.Records), Arg.Is<Mapper<MasterRecordEx>>(mapper => IsMatch(mapper, masterData.Records.First(), true)));
            workbook.Received().Footer(Arg.Is<MasterRecordEx>(x => x == masterData.Total), Arg.Is<Mapper<MasterRecordEx>>(mapper => IsMatch(mapper, masterData.Total, false)));
            workbook.Received().Sheet(Arg.Is<string>(x => x == defaultSheetName));
        }

        private static bool IsMatch(Mapper<MasterRecordEx> mapper, MasterRecordEx masterRecord, bool isBody)
        {
            var result = (int)mapper.Mappings[Column.B](masterRecord) == masterRecord.BetCount &&
                (decimal)mapper.Mappings[Column.C](masterRecord) == masterRecord.Turnover &&
                (decimal)mapper.Mappings[Column.D](masterRecord) == masterRecord.MemberWinLoss &&
                (decimal)mapper.Mappings[Column.E](masterRecord) == masterRecord.AgentWinLoss &&
                (decimal)mapper.Mappings[Column.F](masterRecord) == masterRecord.MasterWinLoss &&
                (decimal)mapper.Mappings[Column.G](masterRecord) == masterRecord.CompanyWinLoss;
            if (isBody)
            {
                result = result && (string)mapper.Mappings[Column.A](masterRecord) == masterRecord.RollupKey;
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
            Workbook<AgentRecordEx> workbook,
            ExcelRequest request,
            AgentData agentData
        )
        {
            // Arrange
            var excelService = new ExcelService(queryService, appSettings, sharedLocalizer, noLocalizer, npoiWorkbookFactory, mapper);
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

        private static bool IsMatch(Mapper<AgentRecordEx> mapper, AgentRecordEx agentRecord, bool isBody)
        {
            var result = (int)mapper.Mappings[Column.B](agentRecord) == agentRecord.BetCount &&
                (decimal)mapper.Mappings[Column.C](agentRecord) == agentRecord.Turnover &&
                (decimal)mapper.Mappings[Column.D](agentRecord) == agentRecord.MemberWinLoss &&
                (decimal)mapper.Mappings[Column.E](agentRecord) == agentRecord.AgentWinLoss &&
                (decimal)mapper.Mappings[Column.F](agentRecord) == agentRecord.CompanyWinLoss;
            if (isBody)
            {
                result = result && (string)mapper.Mappings[Column.A](agentRecord) == agentRecord.RollupKey;
            }

            return result;
        }

        private static bool IsMatch(TemplateInfo templateInfo, string appDataPath, string fileName)
        {
            return templateInfo.TemplatePath == Path.Combine(appDataPath, "ExcelTemplates", "WinLossAnalysis", fileName) &&
                templateInfo.FreezeRowIndex == 3 &&
                templateInfo.FreezeColumnName == Column.B;
        }
    }
}