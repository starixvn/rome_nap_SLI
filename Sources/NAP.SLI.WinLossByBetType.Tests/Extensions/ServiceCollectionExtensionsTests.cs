namespace NAP.SLI.WinLossByBetType.Tests.Extensions
{
    using Microsoft.Extensions.DependencyInjection;
    using NAP.SLI.WinLossByBetType.Extensions;
    using NAP.SLI.WinLossByBetType.Services;
    using Xunit;

    public class ServiceCollectionExtensionsTests
    {
        [Fact]
        public void TestMethod_AddWinLossByBetTypeModule()
        {
            // Arrange
            var services = new ServiceCollection();

            // Act
            services.AddWinLossByBetTypeModule();

            // Assert
            Assert.Equal(2, services.Count);
            Assert.Equal(typeof(IQueryService), services[0].ServiceType);
            Assert.Equal(typeof(QueryService), services[0].ImplementationType);
            Assert.Equal(typeof(IExcelService), services[1].ServiceType);
            Assert.Equal(typeof(ExcelService), services[1].ImplementationType);
        }
    }
}