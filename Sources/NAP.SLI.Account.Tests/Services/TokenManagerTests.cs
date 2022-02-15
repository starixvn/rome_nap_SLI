using System.IdentityModel.Tokens.Jwt;
using NAP.SLI.Account.Models;
using NAP.SLI.Account.Services;
using NAP.SLI.Common.Models;
using NAP.SLI.Common.Services;
using NAP.SLI.Tests;
using NSubstitute;
using Xunit;

namespace NAP.SLI.Account.Tests.Services
{
    public class TokenManagerTests
    {
        [Theory]
        [AutoDomainData]
        public void TestMethod_Generate(
            IAppSettings appSettings,
            JwtSecurityTokenHandler tokenHandler,
            TokenModel model)
        {
            //Arrange
            appSettings.Authentication.Returns(new AuthenticationSettings
            {
                SecretKey = "LHiRzi0DoaIleBGr4sgX7YTbogzFDw6Szu6tk7o9N40bx5XgGXpnejZX7pzB0gU",
                AccessExpiration = 10
            });
            var tokenManager = new TokenManager(appSettings, tokenHandler);

            //Act
            var result = tokenManager.Generate(model);

            //Assert
            Assert.NotEmpty(result);
        }
    }
}