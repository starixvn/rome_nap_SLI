using System.Collections.Generic;
using Fanex.Data.Repository;
using Fanex.RemotingRef;
using NAP.SLI.Common.Services;
using NAP.SLI.Localization.Services;
using NAP.SLI.Tests;
using Newtonsoft.Json;
using NSubstitute;
using Xunit;

namespace NAP.SLI.Common.Tests.Services
{
    public class ReportServiceTests
    {
        [Theory]
        [AutoDomainData]
        public void TestMethod_GetBetTypeNames(
            IDynamicRepository dynamicRepository,
            IRemotingRefService remotingRefService,
            ICurrentContextService currentContextService,
            ICacheContainer cacheContainer,
            ISharedLocalizer sharedLocalizer)
        {
            //Arrange
            currentContextService.GetLanguageCode().Returns("en");
            var service = new ReportService(dynamicRepository, remotingRefService, currentContextService, cacheContainer, sharedLocalizer);
            var betTypes = new List<int> { 1, 2 };
            remotingRefService.GetBetTypeName(Arg.Any<string>(), "en").Returns(x =>
            {
                var betType = x.ArgAt<string>(0);
                var betType2 = x.ArgAt<string>(1);
                return "bt" + betType;
            });

            //Act
            var result = service.GetBetTypeNames(betTypes);

            //Assert
            var expectedResult = new List<string> { "bt1", "bt2" };
            Assert.Equal(JsonConvert.SerializeObject(expectedResult), JsonConvert.SerializeObject(result));
        }

        [Theory]
        [AutoDomainData]
        public void TestMethod_GetSportTypeNames(
            IDynamicRepository dynamicRepository,
            IRemotingRefService remotingRefService,
            ICurrentContextService currentContextService,
            ICacheContainer cacheContainer,
            ISharedLocalizer sharedLocalizer)
        {
            //Arrange
            currentContextService.GetLanguageCode().Returns("en");
            var service = new ReportService(dynamicRepository, remotingRefService, currentContextService, cacheContainer, sharedLocalizer);
            var sportTypes = new List<int> { 1, 2 };
            remotingRefService.GetSportName(Arg.Any<string>(), "en").Returns(x =>
            {
                var betType = x.ArgAt<string>(0);
                var betType2 = x.ArgAt<string>(1);
                return "st" + betType;
            });

            //Act
            var result = service.GetSportTypeNames(sportTypes);

            //Assert
            var expectedResult = new List<string> { "st1", "st2" };
            Assert.Equal(JsonConvert.SerializeObject(expectedResult), JsonConvert.SerializeObject(result));
        }
    }
}