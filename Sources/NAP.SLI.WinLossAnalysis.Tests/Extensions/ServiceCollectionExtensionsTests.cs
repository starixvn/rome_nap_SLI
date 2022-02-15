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
            Assert.Equal(2, services.Count);
            Assert.Equal(typeof(IQueryService), services[0].ServiceType);
            Assert.Equal(typeof(QueryService), services[0].ImplementationType);
            Assert.Equal(typeof(IExcelService), services[1].ServiceType);
            Assert.Equal(typeof(ExcelService), services[1].ImplementationType);
        }
    }
}
