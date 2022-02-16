namespace NAP.SLI.WinLossByBetType.Tests.Services
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using AutoMapper;
    using Fanex.Data.Repository;
    using NAP.SLI.Common.Models;
    using NAP.SLI.Common.Services;
    using NAP.SLI.Tests;
    using NAP.SLI.WinLossByBetType.Criteria;
    using NAP.SLI.WinLossByBetType.Models;
    using NAP.SLI.WinLossByBetType.Requests;
    using NAP.SLI.WinLossByBetType.Services;
    using NSubstitute;
    using Xunit;

    public class QueryServiceTests
    {
        [Theory]
        [AutoDomainData]
        public async Task TestMethod_QuerySuper(
            IReportService reportService,
            IDynamicRepository dynamicRepository,
            IMapper mapper,
            BalanceUpDayModel balanceUpDayModel,
            QueryRequest request,
            IEnumerable<SuperRecord> fetchData)
        {
            // Arrange
            var queryService = new QueryService(reportService, dynamicRepository, mapper);
            reportService.GetBalanceUpDay().Returns(balanceUpDayModel);
            dynamicRepository.FetchAsync<SuperRecord>(Arg.Any<QueryCriteria>()).Returns(Task.FromResult(fetchData));

            // Act
            var result = await queryService.QuerySuper(request);

            // Assert
            await dynamicRepository.Received().FetchAsync<SuperRecord>(Arg.Is<QueryCriteria>(criteria => IsMatch(criteria, balanceUpDayModel, request)));
            var expectedResult = new SuperData(mapper.Map<IEnumerable<SuperRecord>, IEnumerable<SuperRecordEx>>(fetchData));
            Assert.Equal(expectedResult.Records, result.Records);
        }

        [Theory]
        [AutoDomainData]
        public async Task TestMethod_QueryMaster(
            IReportService reportService,
            IDynamicRepository dynamicRepository,
            IMapper mapper,
            BalanceUpDayModel balanceUpDayModel,
            QueryRequest request,
            IEnumerable<MasterRecord> fetchData)
        {
            // Arrange
            var queryService = new QueryService(reportService, dynamicRepository, mapper);
            reportService.GetBalanceUpDay().Returns(balanceUpDayModel);
            dynamicRepository.FetchAsync<MasterRecord>(Arg.Any<QueryCriteria>()).Returns(Task.FromResult(fetchData));

            // Act
            var result = await queryService.QueryMaster(request);

            // Assert
            await dynamicRepository.Received().FetchAsync<MasterRecord>(Arg.Is<QueryCriteria>(criteria => IsMatch(criteria, balanceUpDayModel, request)));
            var expectedResult = new MasterData(mapper.Map<IEnumerable<MasterRecord>, IEnumerable<MasterRecordEx>>(fetchData));
            Assert.Equal(expectedResult.Records, result.Records);
        }

        [Theory]
        [AutoDomainData]
        public async Task TestMethod_QueryAgent(
            IReportService reportService,
            IDynamicRepository dynamicRepository,
            IMapper mapper,
            BalanceUpDayModel balanceUpDayModel,
            QueryRequest request,
            IEnumerable<AgentRecord> fetchData)
        {
            // Arrange
            var queryService = new QueryService(reportService, dynamicRepository, mapper);
            reportService.GetBalanceUpDay().Returns(balanceUpDayModel);
            dynamicRepository.FetchAsync<AgentRecord>(Arg.Any<QueryCriteria>()).Returns(Task.FromResult(fetchData));

            // Act
            var result = await queryService.QueryAgent(request);

            // Assert
            await dynamicRepository.Received().FetchAsync<AgentRecord>(Arg.Is<QueryCriteria>(criteria => IsMatch(criteria, balanceUpDayModel, request)));
            var expectedResult = new AgentData(mapper.Map<IEnumerable<AgentRecord>, IEnumerable<AgentRecordEx>>(fetchData));
            Assert.Equal(expectedResult.Records, result.Records);
        }

        private static bool IsMatch(QueryCriteria criteria, BalanceUpDayModel balanceUpDayModel, QueryRequest request)
        {
            return criteria.BalanceUpDay == balanceUpDayModel.BalanceUpDay &&
                criteria.MoveBetsDay == balanceUpDayModel.MoveBetsDay &&
                criteria.CustId == request.CustId &&
                criteria.RoleId == request.RoleId &&
                criteria.FromDate == request.FromDate &&
                criteria.ToDate == request.ToDate &&
                criteria.ProductIds == ((int)ProductIds.NumberGame).ToString();
        }
    }
}