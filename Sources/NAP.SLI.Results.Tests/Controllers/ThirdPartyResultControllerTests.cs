namespace NAP.SLI.Results.Tests.Controllers
{
    using System.Threading.Tasks;
    using Xunit;
    using NAP.SLI.Tests;
    using MediatR;
    using NAP.SLI.Results.Requests;
    using NAP.SLI.Results.Controllers;
    using NSubstitute;
    using Microsoft.AspNetCore.Mvc;

    public class ThirdPartyResultControllerTests
    {
        [Theory]
        [AutoDomainData]
        public async Task TestMethod_GetHappy5LinkedGameResult(IMediator mediator, Happy5LinkedGameResultRequest request, string sendResult)
        {
            // Arrange
            var controller = new ThirdPartyResultController(mediator);
            mediator.Send(request).Returns(sendResult);

            // Act
            var result = await controller.GetHappy5LinkedGameResult(request);

            // Assert
            await mediator.Received().Send(request);
            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal(sendResult, okResult.Value);
        }

        [Theory]
        [AutoDomainData]
        public async Task TestMethod_GetSoccer5Result(IMediator mediator, Soccer5ResultRequest request, string sendResult)
        {
            // Arrange
            var controller = new ThirdPartyResultController(mediator);
            mediator.Send(request).Returns(sendResult);

            // Act
            var result = await controller.GetSoccer5Result(request);

            // Assert
            await mediator.Received().Send(request);
            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal(sendResult, okResult.Value);
        }
    }
}