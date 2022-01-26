namespace NAP.SLI.Results.Tests.Handlers
{
    using System.Threading.Tasks;
    using NAP.SLI.Results.Handlers;
    using NAP.SLI.Results.Requests;
    using NAP.SLI.Results.Services;
    using NAP.SLI.Tests;
    using NSubstitute;
    using Xunit;

    public class Happy5LinkedGameResultHandlerTests
    {
        [Theory]
        [AutoDomainData]
        public async Task TestMethod_Handle(IThirdPartyResultService service, QueryHappy5LinkedGameResultRequest request, string serviceResult)
        {
            // Arrange
            var handler = new QueryHappy5LinkedGameResultHandler(service);
            service.QueryHappy5LinkedGameResult(request).Returns(serviceResult);

            // Act
            var result = await handler.Handle(request, default);

            // Assert
            await service.Received().QueryHappy5LinkedGameResult(request);
            Assert.Equal(serviceResult, result);
        }
    }
}