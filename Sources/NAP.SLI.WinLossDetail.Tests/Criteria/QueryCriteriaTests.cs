using System;
using AutoFixture;
using NAP.SLI.Common.Models;
using NAP.SLI.WinLossDetail.Criteria;
using Xunit;

namespace NAP.SLI.WinLossDetail.Tests.Criteria
{
    public class QueryCriteriaTests
    {
        [Fact]
        public void TestProperties()
        {
            // Arrange
            var fixture = new Fixture();
            var balanceUpDayModel = fixture.Create<BalanceUpDayModel>();
            var criteria = new QueryCriteria(balanceUpDayModel);

            // Act
            // Assert
            Assert.Equal(criteria.BalanceUpDay, balanceUpDayModel.BalanceUpDay);
            Assert.Equal(criteria.MoveBetsDay, balanceUpDayModel.MoveBetsDay);
            Assert.Equal(criteria.ProductIds, ((int)Common.Models.ProductIds.NumberGame).ToString());
        }

        [Fact]
        public void TestMethod_GetSettingKey_With_Role_Super()
        {
            // Arrange
            var fixture = new Fixture();
            var criteria = fixture.Build<QueryCriteria>()
                .With(c => c.RoleId, (int)CustomerLevels.Super)
                .Create();

            // Act
            var settingKey = criteria.GetSettingKey();

            // Assert
            Assert.Equal("SLI_Rpt_WinLossDetail_Master", settingKey);
        }

        [Fact]
        public void TestMethod_GetSettingKey_With_Role_Master()
        {
            // Arrange
            var fixture = new Fixture();
            var criteria = fixture.Build<QueryCriteria>()
                .With(c => c.RoleId, (int)CustomerLevels.Master)
                .Create();

            // Act
            var settingKey = criteria.GetSettingKey();

            // Assert
            Assert.Equal("SLI_Rpt_WinLossDetail_Agent", settingKey);
        }

        [Fact]
        public void TestMethod_GetSettingKey_With_Role_Agent()
        {
            // Arrange
            var fixture = new Fixture();
            var criteria = fixture.Build<QueryCriteria>()
                .With(c => c.RoleId, (int)CustomerLevels.Agent)
                .Create();

            // Act
            var settingKey = criteria.GetSettingKey();

            // Assert
            Assert.Equal("SLI_Rpt_WinLossDetail_Member", settingKey);
        }

        [Fact]
        public void TestMethod_GetSettingKey_With_Role_Invalid()
        {
            // Arrange
            var fixture = new Fixture();
            var criteria = fixture.Build<QueryCriteria>()
                .With(c => c.RoleId, -1)
                .Create();

            // Act
            // Assert
            Assert.Throws<NotImplementedException>(() => criteria.GetSettingKey());
        }
    }
}