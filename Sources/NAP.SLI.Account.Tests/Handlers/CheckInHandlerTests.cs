using System.Threading.Tasks;
using Fanex.NAP.Client.Configuration;
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
    public class CheckInHandlerTests
    {
        [Theory]
        [AutoDomainData]
        public async Task TestMethod_Handler_WhenDisabled(ISecurityService securityService,
            INapSettings napSettings,
            ICurrentUserService currentUserService,
            CheckInRequest request)
        {
            //Arrange
            var handler = new CheckInHandler(securityService, currentUserService, napSettings);
            napSettings.EnableReCheckIn.Returns(false);

            //Act
            var result = await handler.Handle(request, default);

            //Assert
            var expectedResult = ResultModel.Success;
            Assert.Equal(JsonConvert.SerializeObject(expectedResult), JsonConvert.SerializeObject(result));
        }

        [Theory]
        [AutoDomainData]
        public async Task TestMethod_Handler_ReCheckInFailed(ISecurityService securityService,
            INapSettings napSettings,
            ICurrentUserService currentUserService,
            CheckInRequest request)
        {
            //Arrange
            var handler = new CheckInHandler(securityService, currentUserService, napSettings);
            napSettings.EnableReCheckIn.Returns(true);
            var errCode = 1;
            securityService.ReCheckInAsync(currentUserService.OnUserId, napSettings.SiteId).Returns(errCode);

            //Act
            var result = await handler.Handle(request, default);

            //Assert
            var expectedResult = new ResultModel
            {
                ErrCode = errCode
            };
            Assert.Equal(JsonConvert.SerializeObject(expectedResult), JsonConvert.SerializeObject(result));
        }

        [Theory]
        [AutoDomainData]
        public async Task TestMethod_Handler_ReCheckInSuccess(ISecurityService securityService,
            INapSettings napSettings,
            ICurrentUserService currentUserService,
            CheckInRequest request)
        {
            //Arrange
            var handler = new CheckInHandler(securityService, currentUserService, napSettings);
            napSettings.EnableReCheckIn.Returns(true);
            var errCode = 0;
            securityService.ReCheckInAsync(currentUserService.OnUserId, napSettings.SiteId).Returns(errCode);

            //Act
            var result = await handler.Handle(request, default);

            //Assert
            var expectedResult = ResultModel.Success;
            Assert.Equal(JsonConvert.SerializeObject(expectedResult), JsonConvert.SerializeObject(result));
        }
    }
}