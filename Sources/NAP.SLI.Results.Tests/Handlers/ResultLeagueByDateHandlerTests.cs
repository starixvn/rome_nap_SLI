namespace NAP.SLI.Results.Tests.Handlers
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using NAP.SLI.Results.Handlers;
    using NAP.SLI.Results.Models;
    using NAP.SLI.Results.Requests;
    using NAP.SLI.Results.Services;
    using NAP.SLI.Tests;
    using NSubstitute;
    using Xunit;

    public class ResultLeagueByDateHandlerTests
    {
        [Theory]
        [AutoDomainData]
        public async Task TestMethod_Handle(IResultService service, ResultLeagueByDateRequest request, IEnumerable<ResultLeagueByDateModel> serviceResult)
        {
            // Arrange
            var handler = new ResultLeagueByDateHandler(service);
            service.GetResultLeagueByDate(request).Returns(serviceResult);

            // Act
            var result = await handler.Handle(request, default);

            // Assert
            await service.Received().GetResultLeagueByDate(request);
            Assert.Equal(serviceResult, result);
        }
    }
}