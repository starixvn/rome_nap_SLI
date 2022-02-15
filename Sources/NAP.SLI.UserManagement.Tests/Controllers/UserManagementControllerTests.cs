using System.Collections.Generic;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using NAP.SLI.Common.Models;
using NAP.SLI.Tests;
using NAP.SLI.UserManagement.Controllers;
using NAP.SLI.UserManagement.Models;
using NAP.SLI.UserManagement.Requests;
using NSubstitute;
using Xunit;

namespace NAP.SLI.UserManagement.Tests.Controllers
{
    public class UserManagementControllerTests
    {
        [Theory]
        [AutoDomainData]
        public async Task TestMethod_Query(IMediator mediator, QueryRequest request, IEnumerable<UserModel> model)
        {
            // Arrange
            var controller = new UserManagementController(mediator);
            mediator.Send(request).Returns(model);

            // Act
            var result = await controller.Query(request);

            // Assert
            await mediator.Received().Send(request);
            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal(model, okResult.Value);
        }

        [Theory]
        [AutoDomainData]
        public async Task TestMethod_UpdateInfo(IMediator mediator, UpdateInfoRequest request, ResultModel model)
        {
            // Arrange
            var controller = new UserManagementController(mediator);
            mediator.Send(request).Returns(model);

            // Act
            var result = await controller.UpdateInfo(request);

            // Assert
            await mediator.Received().Send(request);
            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal(model, okResult.Value);
        }

        [Theory]
        [AutoDomainData]
        public async Task TestMethod_ChangePassword(IMediator mediator, ChangePasswordRequest request, ResultModel model)
        {
            // Arrange
            var controller = new UserManagementController(mediator);
            mediator.Send(request).Returns(model);

            // Act
            var result = await controller.ChangePassword(request);

            // Assert
            await mediator.Received().Send(request);
            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal(model, okResult.Value);
        }
    }
}