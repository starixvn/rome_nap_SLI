
namespace NAP.SLI.BetList.Tests.Extensions
{
    using Microsoft.Extensions.DependencyInjection;
    using NAP.SLI.BetList.Extensions;
    using NAP.SLI.BetList.Services;
    using Xunit;

    public class ServiceCollectionExtensionsTests
    {
        [Fact]
        public void TestMethod_AddBetListModule()
        {
            // Arrange
            var services = new ServiceCollection();

            // Act
            services.AddBetListModule();

            // Assert
            Assert.Single(services);
            Assert.Equal(typeof(IQueryService), services[0].ServiceType);
            Assert.Equal(typeof(QueryService), services[0].ImplementationType);
        }
    }
}