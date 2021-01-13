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
    public class WinLossDetailQueryHandlerTests
    {
        [Theory]
        [AutoDomainData]
        public async Task TestMethod_Handle_With_Role_Super(IWinLossDetailQueryService service, SuperData superData)
        {
            // Arrange
            var fixture = new Fixture();
            var handler = new WinLossDetailQueryHandler(service);
            var request = fixture.Build<WinLossDetailQueryRequest>()
                .With(c => c.RoleId, (int)CustomerLevels.Super)
                .Create();
            service.QuerySuper(Arg.Any<WinLossDetailQueryRequest>()).Returns(superData);

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
        public async Task TestMethod_Handle_With_Role_Master(IWinLossDetailQueryService service, MasterData masterData)
        {
            // Arrange
            var fixture = new Fixture();
            var handler = new WinLossDetailQueryHandler(service);
            var request = fixture.Build<WinLossDetailQueryRequest>()
                .With(c => c.RoleId, (int)CustomerLevels.Master)
                .Create();
            service.QueryMaster(Arg.Any<WinLossDetailQueryRequest>()).Returns(masterData);

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
        public async Task TestMethod_Handle_With_Role_Agent(IWinLossDetailQueryService service, AgentData agentData)
        {
            // Arrange
            var fixture = new Fixture();
            var handler = new WinLossDetailQueryHandler(service);
            var request = fixture.Build<WinLossDetailQueryRequest>()
                .With(c => c.RoleId, (int)CustomerLevels.Agent)
                .Create();
            service.QueryAgent(Arg.Any<WinLossDetailQueryRequest>()).Returns(agentData);

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
        public async Task TestMethod_Handle_With_Role_Invalid(IWinLossDetailQueryService service)
        {
            // Arrange
            var fixture = new Fixture();
            var handler = new WinLossDetailQueryHandler(service);
            var request = fixture.Build<WinLossDetailQueryRequest>()
                .With(c => c.RoleId, -1)
                .Create();

            // Act
            // Assert
            await Assert.ThrowsAsync<NotImplementedException>(async () => await handler.Handle(request, default));
        }
    }
}