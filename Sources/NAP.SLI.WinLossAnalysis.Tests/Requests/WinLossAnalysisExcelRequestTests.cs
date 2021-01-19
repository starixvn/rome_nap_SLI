namespace NAP.SLI.WinLossAnalysis.Tests.Requests
{
    using System;
    using AutoFixture;
    using NAP.SLI.WinLossAnalysis.Requests;
    using Xunit;

    public class WinLossDetailExcelRequestTests
    {
        [Fact]
        public void TestMethods_GetDownloadFileName_And_GetExcelTitle()
        {
            // Arrange
            var fixture = new Fixture();
            var request = fixture.Build<WinLossAnalysisExcelRequest>()
                .With(c => c.Username, "username1")
                .With(c => c.FromDate, new DateTime(2020, 1, 11))
                .With(c => c.ToDate, new DateTime(2020, 1, 17))
                .Create();

            // Act
            var downloadFileName = request.GetDownloadFileName();
            var excelTitle = request.GetExcelTitle();

            // Assert
            var expectedDownloadFileName = "Win Loss Analysis-username1-01/11/2020-01/17/2020.xls";
            var expectedExcelTitle = "Win Loss Analysis 01/11/2020 01/17/2020";
            Assert.Equal(expectedDownloadFileName, downloadFileName);
            Assert.Equal(expectedExcelTitle, excelTitle);
        }
    }
}
