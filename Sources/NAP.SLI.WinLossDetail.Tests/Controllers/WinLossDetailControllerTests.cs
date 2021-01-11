namespace NAP.SLI.WinLossDetail.Tests.Controllers
{
    using System.Threading.Tasks;
    using MediatR;
    using Microsoft.AspNetCore.Mvc;
    using NAP.SLI.Tests;
    using NAP.SLI.WinLossDetail.Controllers;
    using NAP.SLI.WinLossDetail.Requests;
    using NSubstitute;
    using Xunit;

    public class WinLossDetailControllerTests
    {
        [Theory]
        [AutoDomainData]
        public async Task TestMethod(IMediator mediator, WinLossDetailQueryRequest request, object sendResult)
        {
            // Arrange
            var controller = new WinLossDetailController(mediator);
            mediator.Send(request).Returns(sendResult);

            // Act
            var result = await controller.Query(request);

            // Assert
            await mediator.Received().Send(request);
            Assert.IsType<OkObjectResult>(result);
            Assert.Equal(sendResult, ((OkObjectResult)result).Value);
        }
    }
}
