
namespace NAP.SLI.Results.Tests.Handlers
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using AutoFixture;
    using NAP.SLI.Common.Models;
    using NAP.SLI.Results.Handlers;
    using NAP.SLI.Results.Models;
    using NAP.SLI.Results.Requests;
    using NAP.SLI.Results.Services;
    using NAP.SLI.Tests;
    using NSubstitute;
    using Xunit;

    public class ExcelHandlerTests
    {
        [Theory]
        [AutoDomainData]
        public async Task TestMethod_Handle_With_Number_Game_Sport_Type(IExcelService service, byte[] serviceResult)
        {
            // Arrange
            var fixture = new Fixture();
            var handler = new ExcelHandler(service);
            var request = fixture.Build<ExcelRequest>()
                .With(c => c.SportType, (int)SportTypes.NumberGame)
                .Create();
            service.ExcelNumberGameResult(request).Returns(serviceResult);

            // Act
            var result = await handler.Handle(request, default);

            // Assert
            await service.Received().ExcelNumberGameResult(request);
            Assert.Equal(serviceResult, result);
        }

        [Theory]
        [AutoDomainData]
        public async Task TestMethod_Handle_With_Happy_5_Sport_Type(IExcelService service, byte[] serviceResult)
        {
            // Arrange
            var fixture = new Fixture();
            var handler = new ExcelHandler(service);
            var request = fixture.Build<ExcelRequest>()
                .With(c => c.SportType, (int)SportTypes.Happy5)
                .Create();
            service.ExcelHappy5Result(request).Returns(serviceResult);

            // Act
            var result = await handler.Handle(request, default);

            // Assert
            await service.Received().ExcelHappy5Result(request);
            Assert.Equal(serviceResult, result);
        }
    }
}