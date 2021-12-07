
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

    public class ResultHandlerTests
    {
        [Theory]
        [AutoDomainData]
        public async Task TestMethod_Handle_With_Number_Game_Sport_Type(IResultService service, IEnumerable<ResultRecord<NumberGameMatch>> resultRecords)
        {
            // Arrange
            var fixture = new Fixture();
            var handler = new ResultHandler(service);
            var request = fixture.Build<ResultRequest>()
                .With(c => c.SportType, (int)SportTypes.NumberGame)
                .Create();
            service.GetNumberGameResult(request).Returns(resultRecords);

            // Act
            var result = await handler.Handle(request, default);

            // Assert
            await service.Received().GetNumberGameResult(request);
            Assert.Equal(resultRecords, result);
        }

        [Theory]
        [AutoDomainData]
        public async Task TestMethod_Handle_With_Happy_5_Sport_Type(IResultService service, IEnumerable<ResultRecord<Happy5Match>> resultRecords)
        {
            // Arrange
            var fixture = new Fixture();
            var handler = new ResultHandler(service);
            var request = fixture.Build<ResultRequest>()
                .With(c => c.SportType, (int)SportTypes.Happy5)
                .Create();
            service.GetHappy5Result(request).Returns(resultRecords);

            // Act
            var result = await handler.Handle(request, default);

            // Assert
            await service.Received().GetHappy5Result(request);
            Assert.Equal(resultRecords, result);
        }
    }
}