namespace NAP.SLI.WinLossAnalysis.Tests.Criteria
{
    using System;
    using AutoFixture;
    using NAP.SLI.Common.Models;
    using NAP.SLI.WinLossAnalysis.Criteria;
    using Xunit;

    public class WinLossAnalysisQueryCriteriaTests
    {
        [Fact]
        public void TestContructor()
        {
            //Arrage
            var fixture = new Fixture();
            var balanceUpDayModel = fixture.Create<BalanceUpDayModel>();

            //Act
            var criteria = new WinLossAnalysisQueryCriteria(balanceUpDayModel);

            //Assert
            Assert.Equal(criteria.BalanceUpDay, balanceUpDayModel.BalanceUpDay);
            Assert.Equal(criteria.MoveBetsDay, balanceUpDayModel.MoveBetsDay);
        }

        [Fact]
        public void TestMethod_GetSettingKey_With_Role_Super()
        {
            // Arrange
            var fixture = new Fixture();
            var criteria = fixture.Build<WinLossAnalysisQueryCriteria>()
                .With(c => c.RoleId, (int)CustomerLevels.Super)
                .Create();

            // Act
            var settingKey = criteria.GetSettingKey();

            // Assert
            Assert.Equal("SLI_Rpt_WinLossAnalysis_Master", settingKey);
        }

        [Fact]
        public void TestMethod_GetSettingKey_With_Role_Master()
        {
            // Arrange
            var fixture = new Fixture();
            var criteria = fixture.Build<WinLossAnalysisQueryCriteria>()
                .With(c => c.RoleId, (int)CustomerLevels.Master)
                .Create();

            // Act
            var settingKey = criteria.GetSettingKey();

            // Assert
            Assert.Equal("SLI_Rpt_WinLossAnalysis_Agent", settingKey);
        }

        [Fact]
        public void TestMethod_GetSettingKey_With_Role_Agent()
        {
            // Arrange
            var fixture = new Fixture();
            var criteria = fixture.Build<WinLossAnalysisQueryCriteria>()
                .With(c => c.RoleId, (int)CustomerLevels.Agent)
                .Create();

            // Act
            var settingKey = criteria.GetSettingKey();

            // Assert
            Assert.Equal("SLI_Rpt_WinLossAnalysis_Member", settingKey);
        }

        [Fact]
        public void TestMethod_GetSettingKey_With_Role_Invalid()
        {
            // Arrange
            var fixture = new Fixture();
            var criteria = fixture.Build<WinLossAnalysisQueryCriteria>()
                .With(c => c.RoleId, -1)
                .Create();

            // Act
            // Assert
            Assert.Throws<NotImplementedException>(() => criteria.GetSettingKey());
        }
    }
}