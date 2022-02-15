namespace NAP.SLI.WinLossAnalysis.Tests.Services
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using AutoFixture;
    using AutoMapper;
    using Microsoft.Extensions.Localization;
    using NAP.SLI.Common.Models;
    using NAP.SLI.Common.Services;
    using NAP.SLI.Tests;
    using NAP.SLI.WinLossAnalysis.Criteria;
    using NAP.SLI.WinLossAnalysis.Models;
    using NAP.SLI.WinLossAnalysis.Requests;
    using NAP.SLI.WinLossAnalysis.Services;
    using NSubstitute;
    using Xunit;

    public class QueryServiceTests
    {
        private readonly string appDataPath;
        private readonly LocalizedString defaultSheetName;

        public QueryServiceTests()
        {
            appDataPath = nameof(appDataPath);
            defaultSheetName = new LocalizedString(nameof(defaultSheetName), nameof(defaultSheetName));
        }

        [Theory]
        [AutoDomainData]
        public async Task TestMethod_QuerySuper(
            IReportService reportService,
            IDynamicRepositoryEx dynamicRepositoryEx,
            IMapper mapper,
            BalanceUpDayModel balanceUpDayModel,
            (IEnumerable<SuperRecord>, IEnumerable<SuperRecord>) fetchData)
        {
            // Arrange
            var mockResult = new SuperData
            {
                Records = mapper.Map<IEnumerable<SuperRecord>, IEnumerable<SuperRecordEx>>(fetchData.Item1),
                Total = mapper.Map<SuperRecord, SuperRecordEx>(fetchData.Item2.First())
            };
            var queryService = new QueryService(reportService, dynamicRepositoryEx, mapper);
            var request = CreateQueryRequestByRole(CustomerLevels.Super);
            reportService.GetBalanceUpDay().Returns(balanceUpDayModel);
            dynamicRepositoryEx.FetchMultipleAsync<SuperRecord, SuperRecord>(Arg.Any<QueryCriteria>()).Returns(Task.FromResult(fetchData));

            // Act
            var result = await queryService.QuerySuper(request);

            // Assert
            await dynamicRepositoryEx.Received().FetchMultipleAsync<SuperRecord, SuperRecord>(Arg.Is<QueryCriteria>(criteria => IsMatch(criteria, balanceUpDayModel, request))).ConfigureAwait(false);
            Assert.Equal(mockResult.Records, result.Records);
            Assert.Equal(mockResult.Total, result.Total);
        }

        [Theory]
        [AutoDomainData]
        public async Task TestMethod_QueryMaster(
            IReportService reportService,
            IDynamicRepositoryEx dynamicRepositoryEx,
            IMapper mapper,
            BalanceUpDayModel balanceUpDayModel,
            (IEnumerable<MasterRecord>, IEnumerable<MasterRecord>) fetchData)
        {
            // Arrange
            var mockResult = new MasterData
            {
                Records = mapper.Map<IEnumerable<MasterRecord>, IEnumerable<MasterRecordEx>>(fetchData.Item1),
                Total = mapper.Map<MasterRecord, MasterRecordEx>(fetchData.Item2.First())
            };
            var queryService = new QueryService(reportService, dynamicRepositoryEx, mapper);
            var request = CreateQueryRequestByRole(CustomerLevels.Master);
            reportService.GetBalanceUpDay().Returns(balanceUpDayModel);
            dynamicRepositoryEx.FetchMultipleAsync<MasterRecord, MasterRecord>(Arg.Any<QueryCriteria>()).Returns(Task.FromResult(fetchData));

            // Act
            var result = await queryService.QueryMaster(request);

            // Assert
            await dynamicRepositoryEx.Received().FetchMultipleAsync<MasterRecord, MasterRecord>(Arg.Is<QueryCriteria>(criteria => IsMatch(criteria, balanceUpDayModel, request)));
            Assert.Equal(mockResult.Records, result.Records);
            Assert.Equal(mockResult.Total, result.Total);
        }


        [Theory]
        [AutoDomainData]
        public async Task TestMethod_QueryAgent(
            IReportService reportService,
            IDynamicRepositoryEx dynamicRepositoryEx,
            IMapper mapper,
            BalanceUpDayModel balanceUpDayModel,
            (IEnumerable<AgentRecord>, IEnumerable<AgentRecord>) fetchData)
        {
            // Arrange
            var mockResult = new AgentData
            {
                Records = mapper.Map<IEnumerable<AgentRecord>, IEnumerable<AgentRecordEx>>(fetchData.Item1),
                Total = mapper.Map<AgentRecord, AgentRecordEx>(fetchData.Item2.First())
            };
            var queryService = new QueryService(reportService, dynamicRepositoryEx, mapper);
            var request = CreateQueryRequestByRole(CustomerLevels.Agent);
            reportService.GetBalanceUpDay().Returns(balanceUpDayModel);
            dynamicRepositoryEx.FetchMultipleAsync<AgentRecord, AgentRecord>(Arg.Any<QueryCriteria>()).Returns(Task.FromResult(fetchData));

            // Act
            var result = await queryService.QueryAgent(request);

            // Assert
            await dynamicRepositoryEx.Received().FetchMultipleAsync<AgentRecord, AgentRecord>(Arg.Is<QueryCriteria>(criteria => IsMatch(criteria, balanceUpDayModel, request)));
            Assert.Equal(mockResult.Records, result.Records);
            Assert.Equal(mockResult.Total, result.Total);
        }

        private static bool IsMatch(QueryCriteria criteria, BalanceUpDayModel balanceUpDayModel, QueryRequest request)
        {
            return criteria.BalanceUpDay == balanceUpDayModel.BalanceUpDay &&
                criteria.MoveBetsDay == balanceUpDayModel.MoveBetsDay &&
                criteria.CustId == request.CustId &&
                criteria.RoleId == request.RoleId &&
                criteria.ReportType == request.ReportType &&
                criteria.FromDate == request.FromDate &&
                criteria.ToDate == request.ToDate;
        }

        private static QueryRequest CreateQueryRequestByRole(CustomerLevels role)
        {
            var fixture = new Fixture();
            var request = fixture.Build<QueryRequest>()
                .With(c => c.RoleId, (int)role)
                .Create();

            return request;
        }
    }
}