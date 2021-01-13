namespace NAP.SLI.WinLossDetail.Tests.Controllers
{
    using System.Threading.Tasks;
    using MediatR;
    using Microsoft.AspNetCore.Mvc;
    using NAP.SLI.Common.Models;
    using NAP.SLI.Tests;
    using NAP.SLI.WinLossDetail.Controllers;
    using NAP.SLI.WinLossDetail.Requests;
    using NSubstitute;
    using Xunit;

    public class WinLossDetailControllerTests
    {
        [Theory]
        [AutoDomainData]
        public async Task TestMethod_Query(IMediator mediator, WinLossDetailQueryRequest request, object sendResult)
        {
            // Arrange
            var controller = new WinLossDetailController(mediator);
            mediator.Send(request).Returns(sendResult);

            // Act
            var result = await controller.Query(request);

            // Assert
            await mediator.Received().Send(request);
            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal(sendResult, okResult.Value);
        }

        [Theory]
        [AutoDomainData]
        public async Task TestMethod_Excel(IMediator mediator, WinLossDetailExcelRequest request, byte[] sendResult)
        {
            // Arrange
            var controller = new WinLossDetailController(mediator);
            mediator.Send(request).Returns(sendResult);

            // Act
            var result = await controller.Excel(request);

            // Assert
            await mediator.Received().Send(request);
            var fileContentResult = Assert.IsType<FileContentResult>(result);
            Assert.Equal(sendResult, fileContentResult.FileContents);
            Assert.Equal(ContentTypes.Excel, fileContentResult.ContentType);
            Assert.Equal(request.GetDownloadFileName(), fileContentResult.FileDownloadName);
        }
    }
}
