using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using NAP.SLI.Common.Controllers;
using NAP.SLI.Common.Services;
using NAP.SLI.Tests;
using NSubstitute;
using Xunit;

namespace NAP.SLI.Common.Tests.Controllers
{
    public class ReportControllerTests
    {
        [Theory]
        [AutoDomainData]
        public void TestMethod_BetTypeNames(IReportService reportService, IEnumerable<int> betTypes)
        {
            // Arrange
            var controller = new ReportController(reportService);
            var betTypeNames = new List<string> { "name1", "name2" };
            reportService.GetBetTypeNames(betTypes).Returns(betTypeNames);

            // Act
            var result = controller.BetTypeNames(betTypes);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal(betTypeNames, okResult.Value);
        }

        [Theory]
        [AutoDomainData]
        public void TestMethod_SportTypeNames(IReportService reportService, IEnumerable<int> sportTypes)
        {
            // Arrange
            var controller = new ReportController(reportService);
            var sportTypeNames = new List<string> { "name1", "name2" };
            reportService.GetSportTypeNames(sportTypes).Returns(sportTypeNames);

            // Act
            var result = controller.SportTypeNames(sportTypes);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal(sportTypeNames, okResult.Value);
        }
    }
}