using System.Collections.Generic;
using System.Threading.Tasks;
using Fanex.NAP.Client.Configuration;
using Fanex.NAP.Client.Models;
using Fanex.NAP.Client.Models.ParameterObject;
using Fanex.NAP.Client.Models.ValueObject;
using Fanex.NAP.Client.Services;
using NAP.SLI.Account.Handlers;
using NAP.SLI.Account.Models;
using NAP.SLI.Account.Requests;
using NAP.SLI.Account.Services;
using NAP.SLI.Common.Models;
using NAP.SLI.Common.Services;
using NAP.SLI.Tests;
using Newtonsoft.Json;
using NSubstitute;
using Xunit;
using static Fanex.NAP.Core.Business.Constant;

namespace NAP.SLI.Account.Tests.Handlers
{
    public class LoginHandlerTests
    {
        [Theory]
        [AutoDomainData]
        public async Task TestMethod_Handler_WhenUserNotFound(
            IUserService userService,
            ISecurityService securityService,
            INapSettings napSettings,
            ICurrentContextService currentContextService,
            ITokenManager tokenManager,
            LoginRequest request)
        {
            //Arrange
            var handler = new LoginHandler(userService, securityService, currentContextService, tokenManager, napSettings);
            User user = null;
            userService.GetAsync(request.Username).Returns(Task.FromResult(user));

            //Act
            var result = await handler.Handle(request, default);

            //Assert
            var expectedResult = new AuthenticationModel
            {
                ErrCode = ErrorCodes.GenericError,
                ErrMsg = "Invalid username or password"
            };
            Assert.Equal(JsonConvert.SerializeObject(expectedResult), JsonConvert.SerializeObject(result));
        }

        [Theory]
        [AutoDomainData]
        public async Task TestMethod_Handler_WhenUserNoPermission(
            IUserService userService,
            ISecurityService securityService,
            INapSettings napSettings,
            ICurrentContextService currentContextService,
            ITokenManager tokenManager,
            LoginRequest request)
        {
            //Arrange
            var handler = new LoginHandler(userService, securityService, currentContextService, tokenManager, napSettings);
            var user = new User
            {
                Password = request.Password
            };
            userService.GetAsync(request.Username).Returns(Task.FromResult(user));
            napSettings.SiteId.Returns(1);
            IEnumerable<SiteLevel> siteLevels = new List<SiteLevel>
            {
                new SiteLevel
                {
                    Site = new Site
                    {
                        Id = 2
                    }
                }
            };
            userService.GetSiteLevelAsync(user.Id, napSettings.Environment).Returns(Task.FromResult(siteLevels));

            //Act
            var result = await handler.Handle(request, default);

            //Assert
            var expectedResult = new AuthenticationModel
            {
                ErrCode = ErrorCodes.GenericError,
                ErrMsg = "You do not have permission"
            };
            Assert.Equal(JsonConvert.SerializeObject(expectedResult), JsonConvert.SerializeObject(result));
        }

        [Theory]
        [AutoDomainData]
        public async Task TestMethod_Handler_WhenLoginSuccess(
            IUserService userService,
            ISecurityService securityService,
            INapSettings napSettings,
            ICurrentContextService currentContextService,
            ITokenManager tokenManager,
            LoginRequest request)
        {
            //Arrange
            var handler = new LoginHandler(userService, securityService, currentContextService, tokenManager, napSettings);
            var user = new User
            {
                Name = "test",
                Password = request.Password
            };
            userService.GetAsync(request.Username).Returns(Task.FromResult(user));
            napSettings.SiteId.Returns(1);
            IEnumerable<SiteLevel> siteLevels = new List<SiteLevel>
            {
                new SiteLevel
                {
                    Site = new Site
                    {
                        Id = 1
                    },
                    Level = (int)Level.SiteAdmin
                }
            };
            userService.GetSiteLevelAsync(user.Id, napSettings.Environment).Returns(Task.FromResult(siteLevels));
            securityService.LoginAsync(Arg.Any<LoginParameter>()).Returns(Task.FromResult(1));
            var token = "token";
            tokenManager.Generate(Arg.Any<TokenModel>()).Returns(token);

            //Act
            var result = await handler.Handle(request, default);

            //Assert
            var expectedResult = new AuthenticationModel
            {
                Username = user.Username,
                UserId = user.Id,
                IsAdmin = true,
                Token = token
            };
            Assert.Equal(JsonConvert.SerializeObject(expectedResult), JsonConvert.SerializeObject(result));
        }
    }
}