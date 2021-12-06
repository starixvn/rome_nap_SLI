
namespace NAP.SLI.Results.Tests.Handlers
{
    using System.Threading.Tasks;
    using NAP.SLI.Results.Handlers;
    using NAP.SLI.Results.Requests;
    using NAP.SLI.Results.Services;
    using NAP.SLI.Tests;
    using NSubstitute;
    using Xunit;

    public class Soccer5ResultHandlerTests
    {
        [Theory]
        [AutoDomainData]
        public async Task TestMethod_Handle(IThirdPartyResultService service, Soccer5ResultRequest request, string serviceResult)
        {
            // Arrange
            var handler = new Soccer5ResultHandler(service);
            service.GetSoccer5Result(request).Returns(serviceResult);

            // Act
            var result = await handler.Handle(request, default);

            // Assert
            service.Received().GetSoccer5Result(request);
            Assert.Equal(serviceResult, result);
        }
    }
}