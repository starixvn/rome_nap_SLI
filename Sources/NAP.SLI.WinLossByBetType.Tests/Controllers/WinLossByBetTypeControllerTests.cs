using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using NAP.SLI.Common.Extensions;
using NAP.SLI.Common.Models;
using NAP.SLI.Tests;
using NAP.SLI.WinLossByBetType.Controllers;
using NAP.SLI.WinLossByBetType.Requests;
using NSubstitute;
using Xunit;

namespace NAP.SLI.WinLossByBetType.Tests.Controllers
{
    public class WinLossByBetTypeControllerTests
    {
        [Theory]
        [AutoDomainData]
        public async Task TestMethod_Query(IMediator mediator, QueryRequest request, object sendResult)
        {
            // Arrange
            var controller = new WinLossByBetTypeController(mediator);
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
        public async Task TestMethod_Excel(IMediator mediator, ExcelRequest request, byte[] sendResult)
        {
            // Arrange
            var controller = new WinLossByBetTypeController(mediator);
            mediator.Send(request).Returns(sendResult);

            // Act
            var result = await controller.Excel(request);

            // Assert
            await mediator.Received().Send(request);
            var fileContentResult = Assert.IsType<FileContentResult>(result);
            Assert.Equal(sendResult, fileContentResult.FileContents);
            Assert.Equal(ContentTypes.Excel, fileContentResult.ContentType);

            var expectedFileDownloadName = $"{string.Join("-", "Win Loss By Bet Type", request.Username, request.FromDate.ToDateString(), request.ToDate.ToDateString())}.xls";
            Assert.Equal(expectedFileDownloadName, fileContentResult.FileDownloadName);
        }
    }
}