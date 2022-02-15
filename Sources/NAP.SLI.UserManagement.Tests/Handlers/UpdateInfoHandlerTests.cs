using System.Threading.Tasks;
using Fanex.NAP.Client.Configuration;
using Fanex.NAP.Client.Models;
using Fanex.NAP.Client.Models.ParameterObject;
using Fanex.NAP.Client.Services;
using NAP.SLI.Common.Models;
using NAP.SLI.Tests;
using NAP.SLI.UserManagement.Handlers;
using NAP.SLI.UserManagement.Requests;
using Newtonsoft.Json;
using NSubstitute;
using Xunit;

namespace NAP.SLI.UserManagement.Tests.Handlers
{
    public class UpdateInfoHandlerTests
    {
        [Theory]
        [AutoDomainData]
        public async Task TestMethod_Handler_WhenUserNotFound(
            ISecurityService securityService,
            IUserService userService,
            INapSettings napSettings,
            UpdateInfoRequest request)
        {
            //Arrange
            var handler = new UpdateInfoHandler(securityService, userService, napSettings);
            User user = null;
            userService.GetAsync(request.CustId).Returns(Task.FromResult(user));

            //Act
            var result = await handler.Handle(request, default);

            //Assert
            var expectedResult = new ResultModel
            {
                ErrCode = ErrorCodes.GenericError,
                ErrMsg = "User not found"
            };
            Assert.Equal(JsonConvert.SerializeObject(expectedResult), JsonConvert.SerializeObject(result));
        }

        [Theory]
        [AutoDomainData]
        public async Task TestMethod_Handler_WhenUpdateSuccess(
            ISecurityService securityService,
            IUserService userService,
            INapSettings napSettings,
            UpdateInfoRequest request)
        {
            //Arrange
            var handler = new UpdateInfoHandler(securityService, userService, napSettings);
            var user = new User
            {
                Group = new Group
                {
                    Id = 1
                }
            };
            userService.GetAsync(request.CustId).Returns(Task.FromResult(user));
            securityService.UpdateProfileAsync(napSettings.SiteId, Arg.Any<UpdateUserInfoParameter>()).Returns(true);

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
            UpdateInfoRequest request)
        {
            //Arrange
            var handler = new UpdateInfoHandler(securityService, userService, napSettings);
            var user = new User
            {
                Group = new Group
                {
                    Id = 1
                }
            };
            userService.GetAsync(request.CustId).Returns(Task.FromResult(user));
            securityService.UpdateProfileAsync(napSettings.SiteId, Arg.Any<UpdateUserInfoParameter>()).Returns(false);

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