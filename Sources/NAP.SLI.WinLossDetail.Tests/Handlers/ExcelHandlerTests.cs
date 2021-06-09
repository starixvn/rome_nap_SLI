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
    public class ExcelHandlerTests
    {
        [Theory]
        [AutoDomainData]
        public async Task TestMethod_Handle_With_Role_Super(IExcelService service, byte[] returnValue)
        {
            // Arrange
            var fixture = new Fixture();
            var handler = new ExcelHandler(service);
            var request = fixture.Build<ExcelRequest>()
                .With(c => c.RoleId, (int)CustomerLevels.Super)
                .Create();
            service.ExcelSuper(Arg.Any<ExcelRequest>()).Returns(returnValue);

            // Act
            var result = await handler.Handle(request, default);

            // Assert
            await service.Received().ExcelSuper(request);
            Assert.Equal(returnValue, result);
        }

        [Theory]
        [AutoDomainData]
        public async Task TestMethod_Handle_With_Role_Master(IExcelService service, byte[] returnValue)
        {
            // Arrange
            var fixture = new Fixture();
            var handler = new ExcelHandler(service);
            var request = fixture.Build<ExcelRequest>()
                .With(c => c.RoleId, (int)CustomerLevels.Master)
                .Create();
            service.ExcelMaster(Arg.Any<ExcelRequest>()).Returns(returnValue);

            // Act
            var result = await handler.Handle(request, default);

            // Assert
            await service.Received().ExcelMaster(request);
            Assert.Equal(returnValue, result);
        }

        [Theory]
        [AutoDomainData]
        public async Task TestMethod_Handle_With_Role_Agent(IExcelService service, byte[] returnValue)
        {
            // Arrange
            var fixture = new Fixture();
            var handler = new ExcelHandler(service);
            var request = fixture.Build<ExcelRequest>()
                .With(c => c.RoleId, (int)CustomerLevels.Agent)
                .Create();
            service.ExcelAgent(Arg.Any<ExcelRequest>()).Returns(returnValue);

            // Act
            var result = await handler.Handle(request, default);

            // Assert
            await service.Received().ExcelAgent(request);
            Assert.Equal(returnValue, result);
        }

        [Theory]
        [AutoDomainData]
        public async Task TestMethod_Handle_With_Role_Invalid(IExcelService service)
        {
            // Arrange
            var fixture = new Fixture();
            var handler = new ExcelHandler(service);
            var request = fixture.Build<ExcelRequest>()
                .With(c => c.RoleId, -1)
                .Create();

            // Act
            // Assert
            await Assert.ThrowsAsync<NotImplementedException>(async () => await handler.Handle(request, default));
        }
    }
}