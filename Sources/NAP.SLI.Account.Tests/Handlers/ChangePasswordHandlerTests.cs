using System.Threading.Tasks;
using Fanex.NAP.Client.Configuration;
using Fanex.NAP.Client.Models;
using Fanex.NAP.Client.Services;
using NAP.SLI.Account.Handlers;
using NAP.SLI.Account.Requests;
using NAP.SLI.Common.Models;
using NAP.SLI.Common.Services;
using NAP.SLI.Tests;
using Newtonsoft.Json;
using NSubstitute;
using Xunit;

namespace NAP.SLI.Account.Tests.Handlers
{
    public class ChangePasswordHandlerTests
    {
        [Theory]
        [AutoDomainData]
        public async Task TestMethod_Handler_WhenUserNotFound(
            ISecurityService securityService,
            IUserService userService,
            INapSettings napSettings,
            ICurrentUserService currentUserService,
            ChangePasswordRequest request)
        {
            //Arrange
            var handler = new ChangePasswordHandler(securityService, userService, napSettings, currentUserService);
            User user = null;
            userService.GetAsync(currentUserService.UserId).Returns(Task.FromResult(user));

            //Act
            var result = await handler.Handle(request, default);

            //Assert
            var expectedResult = new ResultModel
            {
                ErrCode = ErrorCodes.GenericError,
                ErrMsg = "Incorrect password"
            };
            Assert.Equal(JsonConvert.SerializeObject(expectedResult), JsonConvert.SerializeObject(result));
        }

        [Theory]
        [AutoDomainData]
        public async Task TestMethod_Handler_WhenPasswordNotSame(
            ISecurityService securityService,
            IUserService userService,
            INapSettings napSettings,
            ICurrentUserService currentUserService,
            ChangePasswordRequest request)
        {
            //Arrange
            var handler = new ChangePasswordHandler(securityService, userService, napSettings, currentUserService);
            var user = new User
            {
                Password = request.OldPassword + "diff"
            };
            userService.GetAsync(currentUserService.UserId).Returns(Task.FromResult(user));

            //Act
            var result = await handler.Handle(request, default);

            //Assert
            var expectedResult = new ResultModel
            {
                ErrCode = ErrorCodes.GenericError,
                ErrMsg = "Incorrect password"
            };
            Assert.Equal(JsonConvert.SerializeObject(expectedResult), JsonConvert.SerializeObject(result));
        }

        [Theory]
        [AutoDomainData]
        public async Task TestMethod_Handler_WhenUpdateSuccess(
            ISecurityService securityService,
            IUserService userService,
            INapSettings napSettings,
            ICurrentUserService currentUserService,
            ChangePasswordRequest request)
        {
            //Arrange
            var handler = new ChangePasswordHandler(securityService, userService, napSettings, currentUserService);
            var user = new User
            {
                Password = request.OldPassword
            };
            userService.GetAsync(currentUserService.UserId).Returns(Task.FromResult(user));
            securityService.UpdatePasswordAsync(napSettings.SiteId, currentUserService.UserId, request.NewPassword).Returns(Task.FromResult(true));

            //Act
            var result = await handler.Handle(request, default);

            //Assert
            var expectedResult = ResultModel.Success;
            Assert.Equal(JsonConvert.SerializeObject(expectedResult), JsonConvert.SerializeObject(result));
        }

        [Theory]
        [AutoDomainData]
        public async Task TestMethod_Handler_WhenUpdateFailure(
            ISecurityService securityService,
            IUserService userService,
            INapSettings napSettings,
            ICurrentUserService currentUserService,
            ChangePasswordRequest request)
        {
            //Arrange
            var handler = new ChangePasswordHandler(securityService, userService, napSettings, currentUserService);
            var user = new User
            {
                Password = request.OldPassword
            };
            userService.GetAsync(currentUserService.UserId).Returns(Task.FromResult(user));
            securityService.UpdatePasswordAsync(napSettings.SiteId, currentUserService.UserId, request.NewPassword).Returns(Task.FromResult(false));

            //Act
            var result = await handler.Handle(request, default);

            //Assert
            var expectedResult = new ResultModel
            {
                ErrCode = ErrorCodes.GenericError,
                ErrMsg = "Update failed"
            };
            Assert.Equal(JsonConvert.SerializeObject(expectedResult), JsonConvert.SerializeObject(result));
        }
    }
}