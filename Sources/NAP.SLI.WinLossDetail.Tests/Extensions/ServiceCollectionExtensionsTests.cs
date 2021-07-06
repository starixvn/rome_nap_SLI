namespace NAP.SLI.WinLossDetail.Tests.Extensions
{
    using Microsoft.Extensions.DependencyInjection;
    using Xunit;
    using NAP.SLI.WinLossDetail.Extensions;
    using NAP.SLI.WinLossDetail.Services;

    public class ServiceCollectionExtensionsTests
    {
        [Fact]
        public void TestMethod_AddWinLossDetailModule()
        {
            // Arrange
            var services = new ServiceCollection();

            // Act
            services.AddWinLossDetailModule();

            // Assert
            Assert.Equal(2, services.Count);
            Assert.Equal(typeof(IQueryService), services[0].ServiceType);
            Assert.Equal(typeof(QueryService), services[0].ImplementationType);
            Assert.Equal(typeof(IExcelService), services[1].ServiceType);
            Assert.Equal(typeof(ExcelService), services[1].ImplementationType);
        }
    }
}
