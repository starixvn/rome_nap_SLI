using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using NAP.SLI.Account.Controllers;
using NAP.SLI.Account.Models;
using NAP.SLI.Account.Requests;
using NAP.SLI.Common.Models;
using NAP.SLI.Tests;
using NSubstitute;
using Xunit;

namespace NAP.SLI.Account.Tests.Controllers
{
    public class AccountControllerTests
    {
        [Theory]
        [AutoDomainData]
        public async Task TestMethod_Login(IMediator mediator, LoginRequest request, AuthenticationModel sendResult)
        {
            // Arrange
            var controller = new AccountController(mediator);
            mediator.Send(request).Returns(sendResult);

            // Act
            var result = await controller.Login(request);

            // Assert
            await mediator.Received().Send(request);
            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal(sendResult, okResult.Value);
        }

        [Theory]
        [AutoDomainData]
        public async Task TestMethod_Refresh(IMediator mediator, RefreshRequest request, AuthenticationModel sendResult)
        {
            // Arrange
            var controller = new AccountController(mediator);
            mediator.Send(request).Returns(sendResult);

            // Act
            var result = await controller.Refresh(request);

            // Assert
            await mediator.Received().Send(request);
            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal(sendResult, okResult.Value);
        }

        [Theory]
        [AutoDomainData]
        public async Task TestMethod_CheckIn(IMediator mediator, CheckInRequest request, ResultModel sendResult)
        {
            // Arrange
            var controller = new AccountController(mediator);
            mediator.Send(request).Returns(sendResult);

            // Act
            var result = await controller.CheckIn(request);

            // Assert
            await mediator.Received().Send(request);
            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal(sendResult, okResult.Value);
        }

        [Theory]
        [AutoDomainData]
        public async Task TestMethod_ChangePassword(IMediator mediator, ChangePasswordRequest request, ResultModel sendResult)
        {
            // Arrange
            var controller = new AccountController(mediator);
            mediator.Send(request).Returns(sendResult);

            // Act
            var result = await controller.ChangePassword(request);

            // Assert
            await mediator.Received().Send(request);
            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal(sendResult, okResult.Value);
        }
    }
}