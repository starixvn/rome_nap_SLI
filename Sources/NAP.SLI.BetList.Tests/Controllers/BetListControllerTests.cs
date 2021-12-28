namespace NAP.SLI.BetList.Tests.Controllers
{
    using Xunit;
    using NAP.SLI.Tests;
    using System.Threading.Tasks;
    using MediatR;
    using NAP.SLI.BetList.Requests;
    using NAP.SLI.BetList.Controller;
    using NSubstitute;
    using Microsoft.AspNetCore.Mvc;

    public class BetListControllerTests
    {
        [Theory]
        [AutoDomainData]
        public async Task TestMethod_GetByDate(IMediator mediator, QueryByDateRequest request, object sendResult)
        {
            // Arrange 
            var controller = new BetListController(mediator);
            mediator.Send(request).Returns(sendResult);

            // Act
            var result = await controller.GetByDate(request);

            // Assert
            await mediator.Received().Send(request);
            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal(sendResult, okResult.Value);
        }

        [Theory]
        [AutoDomainData]
        public async Task TestMethod_GetByMatch(IMediator mediator, QueryByMatchRequest request, object sendResult)
        {
            // Arrange
            var controller = new BetListController(mediator);
            mediator.Send(request).Returns(sendResult);

            // Act
            var result = await controller.GetByMatch(request);

            // Assert
            await mediator.Received().Send(request);
            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal(sendResult, okResult.Value);
        }

        [Theory]
        [AutoDomainData]
        public async Task TestMethod_GetByBettype(IMediator mediator, QueryByBetTypeRequest request, object sendResult)
        {
            // Arrange
            var controller = new BetListController(mediator);
            mediator.Send(request).Returns(sendResult);

            // Act
            var result = await controller.GetByBettype(request);

            // Assert
            await mediator.Received().Send(request);
            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal(sendResult, okResult.Value);
        }
    }
}