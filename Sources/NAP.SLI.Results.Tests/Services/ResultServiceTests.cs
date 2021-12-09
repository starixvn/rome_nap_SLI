namespace NAP.SLI.Results.Tests.Services
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Fanex.RemotingRef;
    using NAP.SLI.Common.Services;
    using NAP.SLI.Results.Criteria;
    using NAP.SLI.Results.Models;
    using NAP.SLI.Results.Requests;
    using NAP.SLI.Results.Services;
    using NAP.SLI.Tests;
    using NSubstitute;
    using Xunit;

    public class ResultServiceTests
    {
        [Theory]
        [AutoDomainData]
        public async Task TestMethod_GetResultSportByDate(
            IDynamicRepositoryEx dynamicRepositoryEx,
            ICurrentContextService currentContextService,
            IRemotingRefService remotingRefService,
            ResultSportByDateRequest request,
            IEnumerable<ResultSportByDateModel> fetchData
            )
        {
            // Arrange
            var service = new ResultService(dynamicRepositoryEx, currentContextService, remotingRefService);
            dynamicRepositoryEx.FetchAsync<ResultSportByDateModel>(Arg.Any<GetResultSportByDateCriteria>())
                            .Returns(Task.FromResult(fetchData));

            // Act
            var result = await service.GetResultSportByDate(request);

            // Assert
            await dynamicRepositoryEx.Received()
                                .FetchAsync<ResultSportByDateModel>(
                                    Arg.Is<GetResultSportByDateCriteria>(c => c.EventDate == request.FromDate));
            Assert.Equal(fetchData, result);
        }

        [Theory]
        [AutoDomainData]
        public async Task TestMethod_GetResultLeagueByDate(
            IDynamicRepositoryEx dynamicRepositoryEx,
            ICurrentContextService currentContextService,
            IRemotingRefService remotingRefService,
            ResultLeagueByDateRequest request,
            IEnumerable<ResultLeagueByDateModel> fetchData
            )
        {
            // Arrange
            var service = new ResultService(dynamicRepositoryEx, currentContextService, remotingRefService);
            currentContextService.GetLanguageCode().Returns("en-US");
            dynamicRepositoryEx.FetchAsync<ResultLeagueByDateModel>(Arg.Any<GetResultLeagueByDateCriteria>())
                            .Returns(Task.FromResult(fetchData));

            // Act
            var result = await service.GetResultLeagueByDate(request);

            // Assert
            await dynamicRepositoryEx.Received()
                                .FetchAsync<ResultLeagueByDateModel>(
                                    Arg.Is<GetResultLeagueByDateCriteria>(c => c.EventDate == request.FromDate && c.SportType == request.SportId && c.Language == "en-US"));
            Assert.Equal(fetchData, result);
        }
    }
}