namespace NAP.SLI.WinLossAnalysis.Tests.Controller
{
    using System.Threading.Tasks;
    using MediatR;
    using Microsoft.AspNetCore.Mvc;
    using NAP.SLI.Common.Models;
    using NAP.SLI.Tests;
    using NAP.SLI.WinLossAnalysis.Controllers;
    using NAP.SLI.WinLossAnalysis.Models;
    using NAP.SLI.WinLossAnalysis.Requests;
    using NSubstitute;
    using Xunit;

    public class WinLossAnalysisControllerTests
    {
        [Theory]
        [AutoDomainData]
        public async Task TestMethod_Query(IMediator mediator, WinLossAnalysisQueryRequest request, QueryModel sendResult)
        {
            // Arrange
            var controller = new WinLossAnalysisController(mediator);
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
        public async Task TestMethod_Excel(IMediator mediator, WinLossAnalysisExcelRequest request, byte[] sendResult)
        {
            // Arrange
            var controller = new WinLossAnalysisController(mediator);
            mediator.Send(request).Returns(sendResult);

            // Act
            var result = await controller.Excel(request);

            // Assert
            var fileContentResult = Assert.IsType<FileContentResult>(result);
            Assert.Equal(sendResult, fileContentResult.FileContents);
            Assert.Equal(ContentTypes.Excel, fileContentResult.ContentType);
            Assert.Equal(request.GetDownloadFileName(), fileContentResult.FileDownloadName);
        }
    }
}