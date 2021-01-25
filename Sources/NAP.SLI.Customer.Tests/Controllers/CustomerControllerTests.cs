namespace NAP.SLI.Customer.Tests.Controller
{
    using System.Threading.Tasks;
    using MediatR;
    using Microsoft.AspNetCore.Mvc;
    using NAP.SLI.Customer.Controllers;
    using NAP.SLI.Customer.Models;
    using NAP.SLI.Customer.Requests;
    using NAP.SLI.Tests;
    using NSubstitute;
    using Xunit;

    public class CustomerControllerTests
    {
        [Theory]
        [AutoDomainData]
        public async Task TestMethod_Information(IMediator mediator, GetInformationRequest request, CustomerModel sendResult)
        {
            // Arrange
            var controller = new CustomerController(mediator);
            mediator.Send(request).Returns(sendResult);

            // Act
            var result = await controller.Information(request);

            // Assert
            await mediator.Received().Send(request);
            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal(sendResult, okResult.Value);
        }
    }
}