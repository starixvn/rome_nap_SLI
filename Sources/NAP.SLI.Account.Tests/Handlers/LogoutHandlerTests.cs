using System.Threading.Tasks;
using Fanex.NAP.Client.Services;
using NAP.SLI.Account.Handlers;
using NAP.SLI.Account.Requests;
using NAP.SLI.Common.Services;
using NAP.SLI.Tests;
using NSubstitute;
using Xunit;

namespace NAP.SLI.Account.Tests.Handlers
{
    public class LogoutHandlerTests
    {
        [Theory]
        [AutoDomainData]
        public async Task TestMethod_Handler(ISecurityService securityService, ICurrentUserService currentUserService, LogoutRequest request)
        {
            //Arrange
            var handler = new LogoutHandler(securityService, currentUserService);

            //Act
            await handler.Handle(request, default);

            //Assert
            await securityService.Received().LogoutAsync(currentUserService.OnUserId);
        }
    }
}