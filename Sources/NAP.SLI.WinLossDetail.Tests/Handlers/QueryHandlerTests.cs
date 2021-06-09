using System;
using System.Threading.Tasks;
using AutoFixture;
using NAP.SLI.Common.Models;
using NAP.SLI.Tests;
using NAP.SLI.WinLossDetail.Handlers;
using NAP.SLI.WinLossDetail.Models;
using NAP.SLI.WinLossDetail.Requests;
using NAP.SLI.WinLossDetail.Services;
using NSubstitute;
using Xunit;

namespace NAP.SLI.WinLossDetail.Tests.Handlers
{
    public class QueryHandlerTests
    {
        [Theory]
        [AutoDomainData]
        public async Task TestMethod_Handle_With_Role_Super(IQueryService service, SuperData superData)
        {
            // Arrange
            var fixture = new Fixture();
            var handler = new QueryHandler(service);
            var request = fixture.Build<QueryRequest>()
                .With(c => c.RoleId, (int)CustomerLevels.Super)
                .Create();
            service.QuerySuper(Arg.Any<QueryRequest>()).Returns(superData);

            // Act
            var result = await handler.Handle(request, default);

            // Assert
            await service.Received().QuerySuper(request);
            var data = Assert.IsType<SuperData>(result);
            Assert.Equal(superData.Records, data.Records);
            Assert.Equal(superData.Total, data.Total);
            Assert.Equal(superData.TotalRecords, data.TotalRecords);
        }

        [Theory]
        [AutoDomainData]
        public async Task TestMethod_Handle_With_Role_Master(IQueryService service, MasterData masterData)
        {
            // Arrange
            var fixture = new Fixture();
            var handler = new QueryHandler(service);
            var request = fixture.Build<QueryRequest>()
                .With(c => c.RoleId, (int)CustomerLevels.Master)
                .Create();
            service.QueryMaster(Arg.Any<QueryRequest>()).Returns(masterData);

            // Act
            var result = await handler.Handle(request, default);

            // Assert
            await service.Received().QueryMaster(request);
            var data = Assert.IsType<MasterData>(result);
            Assert.Equal(masterData.Records, data.Records);
            Assert.Equal(masterData.Total, data.Total);
            Assert.Equal(masterData.TotalRecords, data.TotalRecords);
        }

        [Theory]
        [AutoDomainData]
        public async Task TestMethod_Handle_With_Role_Agent(IQueryService service, AgentData agentData)
        {
            // Arrange
            var fixture = new Fixture();
            var handler = new QueryHandler(service);
            var request = fixture.Build<QueryRequest>()
                .With(c => c.RoleId, (int)CustomerLevels.Agent)
                .Create();
            service.QueryAgent(Arg.Any<QueryRequest>()).Returns(agentData);

            // Act
            var result = await handler.Handle(request, default);

            // Assert
            await service.Received().QueryAgent(request);
            var data = Assert.IsType<AgentData>(result);
            Assert.Equal(agentData.Records, data.Records);
            Assert.Equal(agentData.Total, data.Total);
            Assert.Equal(agentData.TotalRecords, data.TotalRecords);
        }

        [Theory]
        [AutoDomainData]
        public async Task TestMethod_Handle_With_Role_Invalid(IQueryService service)
        {
            // Arrange
            var fixture = new Fixture();
            var handler = new QueryHandler(service);
            var request = fixture.Build<QueryRequest>()
                .With(c => c.RoleId, -1)
                .Create();

            // Act
            // Assert
            await Assert.ThrowsAsync<NotImplementedException>(async () => await handler.Handle(request, default));
        }
    }
}