namespace NAP.SLI.WinLossDetail.Tests.Extensions
{
    using Microsoft.Extensions.DependencyInjection;
    using NAP.SLI.WinLossDetail.Extensions;
    using Xunit;
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
            Assert.Equal(typeof(IWinLossDetailQueryService), services[0].ServiceType);
            Assert.Equal(typeof(WinLossDetailQueryService), services[0].ImplementationType);
            Assert.Equal(typeof(IWinLossDetailExcelService), services[1].ServiceType);
            Assert.Equal(typeof(WinLossDetailExcelService), services[1].ImplementationType);
        }
    }
}
