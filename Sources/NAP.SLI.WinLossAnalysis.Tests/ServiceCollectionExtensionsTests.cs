namespace NAP.SLI.WinLossAnalysis.Tests
{
    using Microsoft.Extensions.DependencyInjection;
    using NAP.SLI.WinLossAnalysis.Services;
    using Xunit;

    public class ServiceCollectionExtensionsTests
    {
        [Fact]
        public void TestMethod_AddWinLossDetailModule()
        {
            // Arrange
            var services = new ServiceCollection();

            // Act
            services.AddWinLossAnalysisModule();

            // Assert
            Assert.Single(services);
            Assert.Equal(typeof(IQueryService), services[0].ServiceType);
            Assert.Equal(typeof(QueryService), services[0].ImplementationType);
        }
    }
}
