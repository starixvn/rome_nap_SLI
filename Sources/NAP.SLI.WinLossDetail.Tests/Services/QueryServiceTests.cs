using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using NAP.SLI.Common.Models;
using NAP.SLI.Common.Services;
using NAP.SLI.Tests;
using NAP.SLI.WinLossDetail.Criteria;
using NAP.SLI.WinLossDetail.Models;
using NAP.SLI.WinLossDetail.Requests;
using NAP.SLI.WinLossDetail.Services;
using NSubstitute;
using Xunit;

namespace NAP.SLI.WinLossDetail.Tests.Services
{
    public class QueryServiceTests
    {
        [Theory]
        [AutoDomainData]
        public async Task TestMethod_QuerySuper(
            IReportService reportService,
            IDynamicRepositoryEx dynamicRepositoryEx,
            IMapper mapper,
            BalanceUpDayModel balanceUpDayModel,
            QueryRequest request,
            (IEnumerable<SuperRecord>, IEnumerable<SuperRecord>) fetchData)
        {
            // Arrange
            var queryService = new QueryService(reportService, dynamicRepositoryEx, mapper);
            reportService.GetBalanceUpDay().Returns(balanceUpDayModel);
            dynamicRepositoryEx.FetchMultipleAsync<SuperRecord, SuperRecord>(Arg.Any<QueryCriteria>()).Returns(Task.FromResult(fetchData));

            // Act
            var result = await queryService.QuerySuper(request);

            // Assert
            await dynamicRepositoryEx.Received().FetchMultipleAsync<SuperRecord, SuperRecord>(Arg.Is<QueryCriteria>(criteria => IsMatch(criteria, balanceUpDayModel, request)));
            Assert.Equal(fetchData.Item1, result.Records);
            Assert.Equal(fetchData.Item2.First(), result.Total);
        }

        [Theory]
        [AutoDomainData]
        public async Task TestMethod_QueryMaster(
            IReportService reportService,
            IDynamicRepositoryEx dynamicRepositoryEx,
            IMapper mapper,
            BalanceUpDayModel balanceUpDayModel,
            QueryRequest request,
            (IEnumerable<MasterRecord>, IEnumerable<MasterRecord>) fetchData)
        {
            // Arrange
            var queryService = new QueryService(reportService, dynamicRepositoryEx, mapper);
            reportService.GetBalanceUpDay().Returns(balanceUpDayModel);
            dynamicRepositoryEx.FetchMultipleAsync<MasterRecord, MasterRecord>(Arg.Any<QueryCriteria>()).Returns(Task.FromResult(fetchData));

            // Act
            var result = await queryService.QueryMaster(request);

            // Assert
            await dynamicRepositoryEx.Received().FetchMultipleAsync<MasterRecord, MasterRecord>(Arg.Is<QueryCriteria>(criteria => IsMatch(criteria, balanceUpDayModel, request)));
            Assert.Equal(fetchData.Item1, result.Records);
            Assert.Equal(fetchData.Item2.First(), result.Total);
        }

        [Theory]
        [AutoDomainData]
        public async Task TestMethod_QueryAgent(
            IReportService reportService,
            IDynamicRepositoryEx dynamicRepositoryEx,
            IMapper mapper,
            BalanceUpDayModel balanceUpDayModel,
            QueryRequest request,
            (IEnumerable<AgentRecord>, IEnumerable<AgentRecord>) fetchData)
        {
            // Arrange
            var queryService = new QueryService(reportService, dynamicRepositoryEx, mapper);
            reportService.GetBalanceUpDay().Returns(balanceUpDayModel);
            dynamicRepositoryEx.FetchMultipleAsync<AgentRecord, AgentRecord>(Arg.Any<QueryCriteria>()).Returns(Task.FromResult(fetchData));

            // Act
            var result = await queryService.QueryAgent(request);

            // Assert
            await dynamicRepositoryEx.Received().FetchMultipleAsync<AgentRecord, AgentRecord>(Arg.Is<QueryCriteria>(criteria => IsMatch(criteria, balanceUpDayModel, request)));
            Assert.Equal(fetchData.Item1, result.Records);
            Assert.Equal(fetchData.Item2.First(), result.Total);
        }

        private static bool IsMatch(QueryCriteria criteria, BalanceUpDayModel balanceUpDayModel, QueryRequest request)
        {
            return criteria.BalanceUpDay == balanceUpDayModel.BalanceUpDay &&
                criteria.MoveBetsDay == balanceUpDayModel.MoveBetsDay &&
                criteria.CustId == request.CustId &&
                criteria.RoleId == request.RoleId &&
                criteria.FromDate == request.FromDate &&
                criteria.ToDate == request.ToDate &&
                criteria.ProductIds == ((int)ProductIds.NumberGame).ToString() &&
                criteria.PageSize == request.PageSize &&
                criteria.PageIndex == request.PageIndex &&
                criteria.IsHistory == request.IsHistory;
        }
    }
}