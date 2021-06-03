using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
    public class WinLossDetailQueryServiceTests
    {
        [Theory]
        [AutoDomainData]
        public async Task TestMethod_QuerySuper(
            IReportService reportService,
            IDynamicRepositoryEx dynamicRepositoryEx,
            BalanceUpDayModel balanceUpDayModel,
            WinLossDetailQueryRequest request,
            (IEnumerable<SuperRecord>, IEnumerable<SuperRecord>) fetchData)
        {
            // Arrange
            var winLossDetailQueryService = new WinLossDetailQueryService(reportService, dynamicRepositoryEx);
            reportService.GetBalanceUpDay().Returns(balanceUpDayModel);
            dynamicRepositoryEx.FetchMultipleAsync<SuperRecord, SuperRecord>(Arg.Any<WinLossDetailQueryCriteria>()).Returns(Task.FromResult(fetchData));

            // Act
            var result = await winLossDetailQueryService.QuerySuper(request);

            // Assert
            await dynamicRepositoryEx.Received().FetchMultipleAsync<SuperRecord, SuperRecord>(Arg.Is<WinLossDetailQueryCriteria>(criteria => IsMatch(criteria, balanceUpDayModel, request)));
            Assert.Equal(fetchData.Item1, result.Records);
            Assert.Equal(fetchData.Item2.First(), result.Total);
        }

        [Theory]
        [AutoDomainData]
        public async Task TestMethod_QueryMaster(
            IReportService reportService,
            IDynamicRepositoryEx dynamicRepositoryEx,
            BalanceUpDayModel balanceUpDayModel,
            WinLossDetailQueryRequest request,
            (IEnumerable<MasterRecord>, IEnumerable<MasterRecord>) fetchData)
        {
            // Arrange
            var winLossDetailQueryService = new WinLossDetailQueryService(reportService, dynamicRepositoryEx);
            reportService.GetBalanceUpDay().Returns(balanceUpDayModel);
            dynamicRepositoryEx.FetchMultipleAsync<MasterRecord, MasterRecord>(Arg.Any<WinLossDetailQueryCriteria>()).Returns(Task.FromResult(fetchData));

            // Act
            var result = await winLossDetailQueryService.QueryMaster(request);

            // Assert
            await dynamicRepositoryEx.Received().FetchMultipleAsync<MasterRecord, MasterRecord>(Arg.Is<WinLossDetailQueryCriteria>(criteria => IsMatch(criteria, balanceUpDayModel, request)));
            Assert.Equal(fetchData.Item1, result.Records);
            Assert.Equal(fetchData.Item2.First(), result.Total);
        }

        [Theory]
        [AutoDomainData]
        public async Task TestMethod_QueryAgent(
            IReportService reportService,
            IDynamicRepositoryEx dynamicRepositoryEx,
            BalanceUpDayModel balanceUpDayModel,
            WinLossDetailQueryRequest request,
            (IEnumerable<AgentRecord>, IEnumerable<AgentRecord>) fetchData)
        {
            // Arrange
            var winLossDetailQueryService = new WinLossDetailQueryService(reportService, dynamicRepositoryEx);
            reportService.GetBalanceUpDay().Returns(balanceUpDayModel);
            dynamicRepositoryEx.FetchMultipleAsync<AgentRecord, AgentRecord>(Arg.Any<WinLossDetailQueryCriteria>()).Returns(Task.FromResult(fetchData));

            // Act
            var result = await winLossDetailQueryService.QueryAgent(request);

            // Assert
            await dynamicRepositoryEx.Received().FetchMultipleAsync<AgentRecord, AgentRecord>(Arg.Is<WinLossDetailQueryCriteria>(criteria => IsMatch(criteria, balanceUpDayModel, request)));
            Assert.Equal(fetchData.Item1, result.Records);
            Assert.Equal(fetchData.Item2.First(), result.Total);
        }

        private static bool IsMatch(WinLossDetailQueryCriteria criteria, BalanceUpDayModel balanceUpDayModel, WinLossDetailQueryRequest request)
        {
            return criteria.BalanceUpDay == balanceUpDayModel.BalanceUpDay &&
                criteria.MoveBetsDay == balanceUpDayModel.MoveBetsDay &&
                criteria.CustId == request.CustId &&
                criteria.RoleId == request.RoleId &&
                criteria.FromDate == request.FromDate &&
                criteria.ToDate == request.ToDate &&
                criteria.ProductIds == ((int)Common.Models.ProductIds.NumberGame).ToString() &&
                criteria.PageSize == request.PageSize &&
                criteria.PageIndex == request.PageIndex &&
                criteria.IsHistory == request.IsHistory;
        }
    }
}