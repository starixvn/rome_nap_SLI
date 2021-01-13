using System;
using System.Threading.Tasks;
using AutoFixture;
using NAP.SLI.Common.Models;
using NAP.SLI.Tests;
using NAP.SLI.WinLossDetail.Handlers;
using NAP.SLI.WinLossDetail.Requests;
using NAP.SLI.WinLossDetail.Services;
using NSubstitute;
using Xunit;

namespace NAP.SLI.WinLossDetail.Tests.Handlers
{
    public class WinLossDetailExcelHandlerTests
    {
        [Theory]
        [AutoDomainData]
        public async Task TestMethod_Handle_With_Role_Super(IWinLossDetailExcelService service, byte[] returnValue)
        {
            // Arrange
            var fixture = new Fixture();
            var handler = new WinLossDetailExcelHandler(service);
            var request = fixture.Build<WinLossDetailExcelRequest>()
                .With(c => c.RoleId, (int)CustomerLevels.Super)
                .Create();
            service.ExcelSuper(Arg.Any<WinLossDetailExcelRequest>()).Returns(returnValue);

            // Act
            var result = await handler.Handle(request, default);

            // Assert
            await service.Received().ExcelSuper(request);
            Assert.Equal(returnValue, result);
        }

        [Theory]
        [AutoDomainData]
        public async Task TestMethod_Handle_With_Role_Master(IWinLossDetailExcelService service, byte[] returnValue)
        {
            // Arrange
            var fixture = new Fixture();
            var handler = new WinLossDetailExcelHandler(service);
            var request = fixture.Build<WinLossDetailExcelRequest>()
                .With(c => c.RoleId, (int)CustomerLevels.Master)
                .Create();
            service.ExcelMaster(Arg.Any<WinLossDetailExcelRequest>()).Returns(returnValue);

            // Act
            var result = await handler.Handle(request, default);

            // Assert
            await service.Received().ExcelMaster(request);
            Assert.Equal(returnValue, result);
        }

        [Theory]
        [AutoDomainData]
        public async Task TestMethod_Handle_With_Role_Agent(IWinLossDetailExcelService service, byte[] returnValue)
        {
            // Arrange
            var fixture = new Fixture();
            var handler = new WinLossDetailExcelHandler(service);
            var request = fixture.Build<WinLossDetailExcelRequest>()
                .With(c => c.RoleId, (int)CustomerLevels.Agent)
                .Create();
            service.ExcelAgent(Arg.Any<WinLossDetailExcelRequest>()).Returns(returnValue);

            // Act
            var result = await handler.Handle(request, default);

            // Assert
            await service.Received().ExcelAgent(request);
            Assert.Equal(returnValue, result);
        }

        [Theory]
        [AutoDomainData]
        public async Task TestMethod_Handle_With_Role_Invalid(IWinLossDetailExcelService service)
        {
            // Arrange
            var fixture = new Fixture();
            var handler = new WinLossDetailExcelHandler(service);
            var request = fixture.Build<WinLossDetailExcelRequest>()
                .With(c => c.RoleId, -1)
                .Create();

            // Act
            // Assert
            await Assert.ThrowsAsync<NotImplementedException>(async () => await handler.Handle(request, default));
        }
    }
}