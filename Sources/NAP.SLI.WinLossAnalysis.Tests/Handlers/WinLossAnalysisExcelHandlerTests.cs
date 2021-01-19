namespace NAP.SLI.WinLossAnalysis.Tests.Handlers
{
    using System;
    using System.Threading.Tasks;
    using AutoFixture;
    using NAP.SLI.Common.Models;
    using NAP.SLI.Tests;
    using NAP.SLI.WinLossAnalysis.Handlers;
    using NAP.SLI.WinLossAnalysis.Requests;
    using NAP.SLI.WinLossAnalysis.Services;
    using NSubstitute;
    using Xunit;

    public class WinLossDetailExcelHandlerTests
    {
        [Theory]
        [AutoDomainData]
        public async Task TestMethod_Handle_With_Role_Super(IWinLossAnalysisService service, byte[] returnValue)
        {
            // Arrange
            var fixture = new Fixture();
            var handler = new WinLossAnalysisExcelHandler(service);
            var request = fixture.Build<WinLossAnalysisExcelRequest>()
                .With(c => c.RoleId, (int)CustomerLevels.Super)
                .Create();
            service.ExcelViewSuper(Arg.Any<WinLossAnalysisExcelRequest>()).Returns(returnValue);

            // Act
            var result = await handler.Handle(request, default);

            // Assert
            await service.Received().ExcelViewSuper(request);
            Assert.Equal(returnValue, result);
        }

        [Theory]
        [AutoDomainData]
        public async Task TestMethod_Handle_With_Role_Master(IWinLossAnalysisService service, byte[] returnValue)
        {
            // Arrange
            var fixture = new Fixture();
            var handler = new WinLossAnalysisExcelHandler(service);
            var request = fixture.Build<WinLossAnalysisExcelRequest>()
                .With(c => c.RoleId, (int)CustomerLevels.Master)
                .Create();
            service.ExcelViewMaster(Arg.Any<WinLossAnalysisExcelRequest>()).Returns(returnValue);

            // Act
            var result = await handler.Handle(request, default);

            // Assert
            await service.Received().ExcelViewMaster(request);
            Assert.Equal(returnValue, result);
        }

        [Theory]
        [AutoDomainData]
        public async Task TestMethod_Handle_With_Role_Agent(IWinLossAnalysisService service, byte[] returnValue)
        {
            // Arrange
            var fixture = new Fixture();
            var handler = new WinLossAnalysisExcelHandler(service);
            var request = fixture.Build<WinLossAnalysisExcelRequest>()
                .With(c => c.RoleId, (int)CustomerLevels.Agent)
                .Create();
            service.ExcelViewAgent(Arg.Any<WinLossAnalysisExcelRequest>()).Returns(returnValue);

            // Act
            var result = await handler.Handle(request, default);

            // Assert
            await service.Received().ExcelViewAgent(request);
            Assert.Equal(returnValue, result);
        }

        [Theory]
        [AutoDomainData]
        public async Task TestMethod_Handle_With_Role_Invalid(IWinLossAnalysisService service)
        {
            // Arrange
            var fixture = new Fixture();
            var handler = new WinLossAnalysisExcelHandler(service);
            var request = fixture.Build<WinLossAnalysisExcelRequest>()
                .With(c => c.RoleId, -1)
                .Create();

            // Act
            // Assert
            await Assert.ThrowsAsync<NotImplementedException>(async () => await handler.Handle(request, default));
        }
    }
}