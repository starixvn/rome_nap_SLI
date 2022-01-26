
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
        public async Task TestMethod_Handle_With_Number_Game_Sport_Type(IResultService service, IEnumerable<ResultMatch<NumberGameMatch>> resultRecords)
        {
            // Arrange
            var fixture = new Fixture();
            var handler = new QueryResultsByDateHandler(service);
            var request = fixture.Build<QueryResultsByDateRequest>()
                .With(c => c.SportType, (int)SportTypes.NumberGame)
                .Create();
            service.QueryNumberGameResultsByDate(request).Returns(resultRecords);

            // Act
            var result = await handler.Handle(request, default);

            // Assert
            await service.Received().QueryNumberGameResultsByDate(request);
            Assert.Equal(resultRecords, result);
        }

        [Theory]
        [AutoDomainData]
        public async Task TestMethod_Handle_With_Happy_5_Sport_Type(IResultService service, IEnumerable<ResultMatch<Happy5Match>> resultRecords)
        {
            // Arrange
            var fixture = new Fixture();
            var handler = new QueryResultsByDateHandler(service);
            var request = fixture.Build<QueryResultsByDateRequest>()
                .With(c => c.SportType, (int)SportTypes.Happy5)
                .Create();
            service.QueryHappy5ResultsByDate(request).Returns(resultRecords);

            // Act
            var result = await handler.Handle(request, default);

            // Assert
            await service.Received().QueryHappy5ResultsByDate(request);
            Assert.Equal(resultRecords, result);
        }
    }
}