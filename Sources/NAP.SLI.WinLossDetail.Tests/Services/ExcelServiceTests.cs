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
            Workbook<SuperRecord> workbook,
            SuperData superData
        )
        {
            // Arrange
            var excelService = new ExcelService(queryService, sharedLocalizer, appSettings, npoiWorkbookFactory, noLocalizer, mapper);
            queryService.QuerySuper(Arg.Any<QueryRequest>()).Returns(superData);
            npoiWorkbookFactory.Create<SuperRecord>().Returns(workbook);
            appSettings.AppDataPath.Returns(appDataPath);
            sharedLocalizer["DefaultSheetName"].Returns(defaultSheetName);

            // Act
            var result = await excelService.ExcelSuper(request).ConfigureAwait(false);

            // Assert
            await queryService.Received().QuerySuper(Arg.Any<QueryRequest>());
            workbook.Received().UseTemplate(Arg.Is<TemplateInfo>(templateInfo => IsMatch(templateInfo, appDataPath, "Master.xls")));
            workbook.Received().Title(Arg.Is<string>(x => x == $"Win Loss Detail {request.FromDate.ToDateString()} {request.ToDate.ToDateString()}"));
            workbook.Received().Body(Arg.Is<IEnumerable<SuperRecord>>(x => x == superData.Records), Arg.Is<Mapper<SuperRecord>>(mapper => IsMatch(mapper, superData.Records.First(), true)));
            workbook.Received().Footer(Arg.Is<SuperRecord>(x => x == superData.Total), Arg.Is<Mapper<SuperRecord>>(mapper => IsMatch(mapper, superData.Total, false)));
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
            IQueryService queryService,
            IMapper mapper,
            ISharedLocalizer sharedLocalizer,
            INoLocalizer noLocalizer,
            IAppSettings appSettings,
            INpoiWorkbookFactory npoiWorkbookFactory,
            ExcelRequest request,
            Workbook<MasterRecord> workbook,
            MasterData masterData
        )
        {
            // Arrange
            var excelService = new ExcelService(queryService, sharedLocalizer, appSettings, npoiWorkbookFactory, noLocalizer, mapper);
            queryService.QueryMaster(Arg.Any<QueryRequest>()).Returns(masterData);
            npoiWorkbookFactory.Create<MasterRecord>().Returns(workbook);
            appSettings.AppDataPath.Returns(appDataPath);
            sharedLocalizer["DefaultSheetName"].Returns(defaultSheetName);

            // Act
            var result = await excelService.ExcelMaster(request);

            // Assert
            await queryService.Received().QuerySuper(Arg.Any<QueryRequest>());
            workbook.Received().UseTemplate(Arg.Is<TemplateInfo>(templateInfo => IsMatch(templateInfo, appDataPath, "Agent.xls")));
            workbook.Received().Title(Arg.Is<string>(x => x == $"Win Loss Detail {request.FromDate.ToDateString()} {request.ToDate.ToDateString()}"));
            workbook.Received().Body(Arg.Is<IEnumerable<MasterRecord>>(x => x == masterData.Records), Arg.Is<Mapper<MasterRecord>>(mapper => IsMatch(mapper, masterData.Records.First(), true)));
            workbook.Received().Footer(Arg.Is<MasterRecord>(x => x == masterData.Total), Arg.Is<Mapper<MasterRecord>>(mapper => IsMatch(mapper, masterData.Total, false)));
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
            IQueryService queryService,
            IMapper mapper,
            ISharedLocalizer sharedLocalizer,
            INoLocalizer noLocalizer,
            IAppSettings appSettings,
            INpoiWorkbookFactory npoiWorkbookFactory,
            ExcelRequest request,
            Workbook<AgentRecord> workbook,
            AgentData agentData
        )
        {
            // Arrange
            var excelService = new ExcelService(queryService, sharedLocalizer, appSettings, npoiWorkbookFactory, noLocalizer, mapper);
            queryService.QueryAgent(Arg.Any<QueryRequest>()).Returns(agentData);
            npoiWorkbookFactory.Create<AgentRecord>().Returns(workbook);
            appSettings.AppDataPath.Returns(appDataPath);
            sharedLocalizer["DefaultSheetName"].Returns(defaultSheetName);

            // Act
            var result = await excelService.ExcelAgent(request);

            // Assert
            await queryService.Received().QuerySuper(Arg.Any<QueryRequest>());
            workbook.Received().UseTemplate(Arg.Is<TemplateInfo>(templateInfo => IsMatch(templateInfo, appDataPath, "Member.xls")));
            workbook.Received().Title(Arg.Is<string>(x => x == $"Win Loss Detail {request.FromDate.ToDateString()} {request.ToDate.ToDateString()}"));
            workbook.Received().Body(Arg.Is<IEnumerable<AgentRecord>>(x => x == agentData.Records), Arg.Is<Mapper<AgentRecord>>(mapper => IsMatch(mapper, agentData.Records.First(), true)));
            workbook.Received().Footer(Arg.Is<AgentRecord>(x => x == agentData.Total), Arg.Is<Mapper<AgentRecord>>(mapper => IsMatch(mapper, agentData.Total, false)));
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

        private static bool IsMatch(TemplateInfo templateInfo, string appDataPath, string fileName)
        {
            return templateInfo.TemplatePath == Path.Combine(appDataPath, "ExcelTemplates", "WinLossDetail", fileName) &&
                templateInfo.FreezeRowIndex == 3 &&
                templateInfo.FreezeColumnName == Column.B;
        }
    }
}