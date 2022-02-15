using Microsoft.Extensions.Localization;
using NAP.SLI.Localization.Services;
using NAP.SLI.Tests;
using NSubstitute;
using Xunit;

namespace NAP.SLI.Localization.Tests.Services
{
    public class LocalizeServiceTests
    {
        [Theory]
        [AutoDomainData]
        public void TestMethod_Localize(IStringLocalizer stringLocalizer)
        {
            //Arrange
            var service = new LocalizeService(stringLocalizer);
            stringLocalizer["test"].Returns(new LocalizedString("test", "value"));

            //Act
            var result = service.Localize("test");

            //Assert
            Assert.Equal("value", result);
        }
    }
}