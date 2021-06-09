namespace NAP.SLI.Customer.Tests.Extensions
{
    using Microsoft.Extensions.DependencyInjection;
    using NAP.SLI.Customer.Services;
    using Xunit;

    public class ServiceCollectionExtensionsTest
    {
        [Fact]
        public void TestMethod_AddCustomerModule()
        {
            // Arrange
            var services = new ServiceCollection();

            // Act
            services.AddCustomerModule();

            // Assert
            Assert.Single(services);
            Assert.Equal(typeof(ICustomerService), services[0].ServiceType);
            Assert.Equal(typeof(CustomerService), services[0].ImplementationType);
        }
    }
}