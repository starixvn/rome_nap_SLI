namespace NAP.SLI.WinLossAnalysis.Tests.Extensions
{
    using Microsoft.Extensions.DependencyInjection;
    using NAP.SLI.WinLossAnalysis.Extensions;
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
            Assert.Equal(1, services.Count);
            Assert.Equal(typeof(IWinLossAnalysisService), services[0].ServiceType);
            Assert.Equal(typeof(WinLossAnalysisService), services[0].ImplementationType);
        }
    }
}
