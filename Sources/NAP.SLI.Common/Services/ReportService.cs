namespace NAP.SLI.Common.Services
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Fanex.Caching;
    using Fanex.Data.Repository;
    using Fanex.RemotingRef;
    using NAP.SLI.Common.Criteria;
    using NAP.SLI.Common.Models;
    using NAP.SLI.Localization.Services;

    public interface IReportService
    {
        Task<BalanceUpDayModel> GetBalanceUpDay();
        string GetBetTypeName(int betType);
        string GetBetTypeName(int betType, bool liveIndicator);
        string GetSportTypeName(int sportType);
        string GetLeagueName(int leagueId);
        string GetLeagueName3rd(int leagueId);
        IEnumerable<string> GetBetTypeNames(IEnumerable<int> betTypes);
        IEnumerable<string> GetSportTypeNames(IEnumerable<int> sportTypes);
    }

    public class ReportService : IReportService
    {
        private readonly IDynamicRepository dynamicRepository;
        private readonly IRemotingRefService remotingRefService;
        private readonly ICurrentContextService currentContextService;
        private readonly ICacheService memoryCacheService;
        private readonly ISharedLocalizer sharedLocalizer;

        public ReportService(
            IDynamicRepository dynamicRepository,
            IRemotingRefService remotingRefService,
            ICurrentContextService currentContextService,
            ICacheContainer cacheContainer,
            ISharedLocalizer sharedLocalizer)
        {
            this.dynamicRepository = dynamicRepository;
            this.remotingRefService = remotingRefService;
            this.currentContextService = currentContextService;
            memoryCacheService = cacheContainer.MemoryCacheService;
            this.sharedLocalizer = sharedLocalizer;
        }

        public async Task<BalanceUpDayModel> GetBalanceUpDay()
        {
            return await memoryCacheService.GetOrSetAsync("balanceUpDay", async () =>
            {
                return await dynamicRepository.GetAsync<BalanceUpDayModel>(new GetBalanceUpDayCriteria()).ConfigureAwait(false);
            }, new CacheItemOptions().SetAbsoluteExpiration(TimeSpan.FromDays(1))).ConfigureAwait(false);
        }

        public string GetBetTypeName(int betType)
        {
            var languageCode = currentContextService.GetLanguageCode();
            return remotingRefService.GetBetTypeName(betType.ToString(), languageCode);
        }

        public string GetBetTypeName(int betType, bool liveIndicator)
        {
            var betTypeName = GetBetTypeName(betType);
            return betType switch
            {
                (int)BetTypes.OverUnder => sharedLocalizer["Next"] + " " + betTypeName,
                (int)BetTypes.OddEven => (liveIndicator ? (sharedLocalizer["Next"] + " ") : (sharedLocalizer["FT"] + ". ")) + betTypeName,
                (int)BetTypes.NumberWheel => betTypeName + " (" + (liveIndicator ? sharedLocalizer["LiveGame"] : sharedLocalizer["PreGame"]) + ")",
                _ => betTypeName,
            };
        }

        public string GetSportTypeName(int sportType)
        {
            var languageCode = currentContextService.GetLanguageCode();
            return remotingRefService.GetSportName(sportType.ToString(), languageCode);
        }

        public string GetLeagueName(int leagueId)
        {
            var languageCode = currentContextService.GetLanguageCode();
            return remotingRefService.GetLeagueName(leagueId.ToString(), languageCode);
        }

        public string GetLeagueName3rd(int leagueId)
        {
            var languageCode = currentContextService.GetLanguageCode();
            return remotingRefService.GetLeagueName3rd(leagueId.ToString(), languageCode);
        }

        public IEnumerable<string> GetBetTypeNames(IEnumerable<int> betTypes)
        {
            var languageCode = currentContextService.GetLanguageCode();
            return betTypes.Select(x => remotingRefService.GetBetTypeName(x.ToString(), languageCode));
        }

        public IEnumerable<string> GetSportTypeNames(IEnumerable<int> sportTypes)
        {
            var languageCode = currentContextService.GetLanguageCode();
            return sportTypes.Select(x => remotingRefService.GetSportName(x.ToString(), languageCode));
        }
    }
}
