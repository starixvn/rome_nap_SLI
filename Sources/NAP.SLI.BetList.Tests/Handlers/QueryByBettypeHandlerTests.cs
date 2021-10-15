namespace NAP.SLI.BetList.Tests.Handlers
{
    using Xunit;
    using NAP.SLI.Tests;
    using System.Threading.Tasks;
    using NAP.SLI.BetList.Services;
    using NAP.SLI.BetList.Requests;
    using NAP.SLI.BetList.Handlers;
    using NSubstitute;

    public class QueryByBettypeHandlerTests
    {
        [Theory]
        [AutoDomainData]
        public async Task TestMethod_Handle(IQueryService service, QueryByBettypeRequest request, object queryResult)
        {
            // Arrange
            var handler = new QueryByBettypeHandler(service);
            service.QueryByBettype(request).Returns(queryResult);

            // Act
            var result = await handler.Handle(request, default);

            // Assert
            await service.Received().QueryByBettype(request);
            Assert.Equal(queryResult, result);
        }
    }
}