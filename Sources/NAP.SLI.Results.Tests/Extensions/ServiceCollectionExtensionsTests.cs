namespace NAP.SLI.Results.Tests.Extensions
{
    using Microsoft.Extensions.DependencyInjection;
    using NAP.SLI.Results.Extensions;
    using NAP.SLI.Results.Services;
    using Xunit;

    public class ServiceCollectionExtensionsTests
    {
        [Fact]
        public void TestMethod_AddResultsModule()
        {
            // Arrange
            var services = new ServiceCollection();

            // Act
            services.AddResultsModule();

            // Assert
            Assert.Equal(2, services.Count);
            Assert.Equal(typeof(IThirdPartyResultService), services[0].ServiceType);
            Assert.Equal(typeof(ThirdPartyResultService), services[0].ImplementationType);
            Assert.Equal(typeof(IResultService), services[1].ServiceType);
            Assert.Equal(typeof(ResultService), services[1].ImplementationType);
        }
    }
}