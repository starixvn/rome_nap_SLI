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
    using System.Collections.Generic;
    using NAP.SLI.Results.Models;

    public class ResultControllerTests
    {
        [Theory]
        [AutoDomainData]
        public async Task TestMethod_GetResultSportByDate(IMediator mediator, ResultSportByDateRequest request, IEnumerable<ResultSportByDateModel> sendResult)
        {
            // Arrange
            var controller = new ResultController(mediator);
            mediator.Send(request).Returns(sendResult);

            // Act
            var result = await controller.GetResultSportByDate(request);

            // Assert
            await mediator.Received().Send(request);
            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal(sendResult, okResult.Value);
        }

        [Theory]
        [AutoDomainData]
        public async Task TestMethod_GetResultLeagueByDate(IMediator mediator, ResultLeagueByDateRequest request, IEnumerable<ResultLeagueByDateModel> sendResult)
        {
            // Arrange
            var controller = new ResultController(mediator);
            mediator.Send(request).Returns(sendResult);

            // Act
            var result = await controller.GetResultLeagueByDate(request);

            // Assert
            await mediator.Received().Send(request);
            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal(sendResult, okResult.Value);
        }

        [Theory]
        [AutoDomainData]
        public async Task TestMethod_GetResult(IMediator mediator, ResultRequest request, object sendResult)
        {
            // Arrange
            var controller = new ResultController(mediator);
            mediator.Send(request).Returns(sendResult);

            // Act
            var result = await controller.GetResult(request);

            // Assert
            await mediator.Received().Send(request);
            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal(sendResult, okResult.Value);
        }
    }
}