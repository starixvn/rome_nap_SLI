using System.Linq;
using Microsoft.Extensions.Localization;
using NAP.SLI.Localization.Services;
using Xunit;

namespace NAP.SLI.Localization.Tests.Services
{
    public class NoLocalizerTests
    {
        [Fact]
        public void TestMethod_Localize()
        {
            //Arrange
            var localizer = new NoLocalizer();

            //Act
            var result = localizer["test"];

            //Assert
            Assert.Equal("test", result.Name);
            Assert.Equal("test", result.Value);
        }

        [Fact]
        public void TestMethod_GetAllStrings()
        {
            //Arrange
            var localizer = new NoLocalizer();

            //Act
            var result = localizer.GetAllStrings();

            //Assert
            Assert.Equal(Enumerable.Empty<LocalizedString>(), result);
        }
    }
}