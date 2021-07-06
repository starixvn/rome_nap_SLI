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
            Workbook<SuperRecord> workbook,
            ExcelRequest request,
            SuperData superData
        )
        {
            // Arrange
            var excelService = new ExcelService(queryService, appSettings, sharedLocalizer, noLocalizer, npoiWorkbookFactory, mapper);
            queryService.QuerySuper(Arg.Any<QueryRequest>()).Returns(superData);
            npoiWorkbookFactory.Create<SuperRecord>().Returns(workbook);
            appSettings.AppDataPath.Returns(appDataPath);
            sharedLocalizer["DefaultSheetName"].Returns(defaultSheetName);

            // Act
            var result = await excelService.ExcelSuper(request);

            // Assert
            await queryService.Received().QuerySuper(Arg.Any<QueryRequest>());
            workbook.Received().UseTemplate(Arg.Is<TemplateInfo>(templateInfo => IsMatch(templateInfo, appDataPath, "Master.xls")));
            workbook.Received().Title(Arg.Is<string>(x => x == $"Win Loss Analysis {request.FromDate.ToDateString()} {request.ToDate.ToDateString()}"));
            workbook.Received().Body(Arg.Is<IEnumerable<SuperRecord>>(x => x == superData.Records), Arg.Is<Mapper<SuperRecord>>(mapper => IsMatch(mapper, superData.Records.First(), true)));
            workbook.Received().Footer(Arg.Is<SuperRecord>(x => x == superData.Total), Arg.Is<Mapper<SuperRecord>>(mapper => IsMatch(mapper, superData.Total, false)));
            workbook.Received().Sheet(Arg.Is<string>(x => x == defaultSheetName));
        }

        private static bool IsMatch(Mapper<SuperRecord> mapper, SuperRecord superRecord, bool isBody)
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
            IQueryService queryService,
            IMapper mapper,
            ISharedLocalizer sharedLocalizer,
            INoLocalizer noLocalizer,
            IAppSettings appSettings,
            INpoiWorkbookFactory npoiWorkbookFactory,
            Workbook<MasterRecord> workbook,
            ExcelRequest request,
            MasterData masterData
        )
        {
            // Arrange
            var excelService = new ExcelService(queryService, appSettings, sharedLocalizer, noLocalizer, npoiWorkbookFactory, mapper);
            queryService.QueryMaster(Arg.Any<QueryRequest>()).Returns(masterData);
            npoiWorkbookFactory.Create<MasterRecord>().Returns(workbook);
            appSettings.AppDataPath.Returns(appDataPath);
            sharedLocalizer["DefaultSheetName"].Returns(defaultSheetName);

            // Act
            var result = await excelService.ExcelMaster(request).ConfigureAwait(false);

            // Assert
            await queryService.Received().QuerySuper(Arg.Any<QueryRequest>());
            workbook.Received().UseTemplate(Arg.Is<TemplateInfo>(templateInfo => IsMatch(templateInfo, appDataPath, "Agent.xls")));
            workbook.Received().Title(Arg.Is<string>(x => x == $"Win Loss Analysis {request.FromDate.ToDateString()} {request.ToDate.ToDateString()}"));
            workbook.Received().Body(Arg.Is<IEnumerable<MasterRecord>>(x => x == masterData.Records), Arg.Is<Mapper<MasterRecord>>(mapper => IsMatch(mapper, masterData.Records.First(), true)));
            workbook.Received().Footer(Arg.Is<MasterRecord>(x => x == masterData.Total), Arg.Is<Mapper<MasterRecord>>(mapper => IsMatch(mapper, masterData.Total, false)));
            workbook.Received().Sheet(Arg.Is<string>(x => x == defaultSheetName));
        }

        private static bool IsMatch(Mapper<MasterRecord> mapper, MasterRecord masterRecord, bool isBody)
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
            IQueryService queryService,
            IMapper mapper,
            ISharedLocalizer sharedLocalizer,
            INoLocalizer noLocalizer,
            IAppSettings appSettings,
            INpoiWorkbookFactory npoiWorkbookFactory,
            Workbook<AgentRecord> workbook,
            ExcelRequest request,
            AgentData agentData
        )
        {
            // Arrange
            var excelService = new ExcelService(queryService, appSettings, sharedLocalizer, noLocalizer, npoiWorkbookFactory, mapper);
            queryService.QueryAgent(Arg.Any<QueryRequest>()).Returns(agentData);
            npoiWorkbookFactory.Create<AgentRecord>().Returns(workbook);
            appSettings.AppDataPath.Returns(appDataPath);
            sharedLocalizer["DefaultSheetName"].Returns(defaultSheetName);

            // Act
            var result = await excelService.ExcelAgent(request);

            // Assert
            await queryService.Received().QuerySuper(Arg.Any<QueryRequest>());
            workbook.Received().UseTemplate(Arg.Is<TemplateInfo>(templateInfo => IsMatch(templateInfo, appDataPath, "Member.xls")));
            workbook.Received().Title(Arg.Is<string>(x => x == $"Win Loss Analysis {request.FromDate.ToDateString()} {request.ToDate.ToDateString()}"));
            workbook.Received().Body(Arg.Is<IEnumerable<AgentRecord>>(x => x == agentData.Records), Arg.Is<Mapper<AgentRecord>>(mapper => IsMatch(mapper, agentData.Records.First(), true)));
            workbook.Received().Footer(Arg.Is<AgentRecord>(x => x == agentData.Total), Arg.Is<Mapper<AgentRecord>>(mapper => IsMatch(mapper, agentData.Total, false)));
            workbook.Received().Sheet(Arg.Is<string>(x => x == defaultSheetName));
        }

        private static bool IsMatch(Mapper<AgentRecord> mapper, AgentRecord agentRecord, bool isBody)
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

        private static bool IsMatch(TemplateInfo templateInfo, string appDataPath, string fileName)
        {
            return templateInfo.TemplatePath == Path.Combine(appDataPath, "ExcelTemplates", "WinLossAnalysis", fileName) &&
                templateInfo.FreezeRowIndex == 3 &&
                templateInfo.FreezeColumnName == Column.B;
        }
    }
}