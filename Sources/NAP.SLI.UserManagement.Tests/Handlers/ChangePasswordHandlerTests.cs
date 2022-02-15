using System.Threading.Tasks;
using Fanex.NAP.Client.Configuration;
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
    public class ChangePasswordHandlerTests
    {
        [Theory]
        [AutoDomainData]
        public async Task TestMethod_Handler_WhenSuccess(
            ISecurityService securityService,
            INapSettings napSettings,
            ChangePasswordRequest request)
        {
            //Arrange
            var handler = new ChangePasswordHandler(securityService, napSettings);
            securityService.UpdatePasswordAsync(napSettings.SiteId, request.CustId, request.Password).Returns(true);

            //Act
            var result = await handler.Handle(request, default);

            //Assert
            var expectedResult = ResultModel.Success;
            Assert.Equal(JsonConvert.SerializeObject(expectedResult), JsonConvert.SerializeObject(result));
        }

        [Theory]
        [AutoDomainData]
        public async Task TestMethod_Handler_WhenFailure(
            ISecurityService securityService,
            INapSettings napSettings,
            ChangePasswordRequest request)
        {
            //Arrange
            var handler = new ChangePasswordHandler(securityService, napSettings);
            securityService.UpdatePasswordAsync(napSettings.SiteId, request.CustId, request.Password).Returns(false);

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