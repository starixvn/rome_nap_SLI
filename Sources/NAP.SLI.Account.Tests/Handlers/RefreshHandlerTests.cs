using System.Threading.Tasks;
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

namespace NAP.SLI.Account.Tests.Handlers
{
    public class RefreshHandlerTests
    {
        [Theory]
        [AutoDomainData]
        public async Task TestMethod_Handler(ICurrentUserService currentUserService, ITokenManager tokenManager, RefreshRequest request)
        {
            //Arrange
            var token = "123";
            var handler = new RefreshHandler(currentUserService, tokenManager);
            tokenManager.Generate(Arg.Any<TokenModel>()).Returns(token);

            //Act
            var result = await handler.Handle(request, default);

            //Assert
            var expectedResult = new AuthenticationModel
            {
                ErrCode = ErrorCodes.OK,
                Token = token,
                UserId = currentUserService.UserId,
                IsAdmin = currentUserService.IsAdmin
            };
            Assert.Equal(JsonConvert.SerializeObject(expectedResult), JsonConvert.SerializeObject(result));
        }
    }
}