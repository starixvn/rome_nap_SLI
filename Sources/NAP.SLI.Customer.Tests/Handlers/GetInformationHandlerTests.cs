namespace NAP.SLI.Customer.Tests.Handlers
{
    using System.Threading.Tasks;
    using NAP.SLI.Customer.Handlers;
    using NAP.SLI.Customer.Models;
    using NAP.SLI.Customer.Requests;
    using NAP.SLI.Customer.Services;
    using NAP.SLI.Tests;
    using NSubstitute;
    using Xunit;

    public class GetInformationHandlerTests
    {
        [Theory]
        [AutoDomainData]
        public async Task TestMethod_Handler(ICustomerService customerService, GetInformationRequest request, CustomerModel queryResult)
        {
            //Arrange
            var getInformationHandler = new GetInformationHandler(customerService);
            customerService.GetInformation(request.Username).Returns(queryResult);

            //Act
            var result = await getInformationHandler.Handle(request, default);

            //Assert
            await customerService.Received().GetInformation(request.Username);
            Assert.Equal(queryResult, result);
        }
    }
}