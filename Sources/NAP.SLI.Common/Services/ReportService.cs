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

    public interface IReportService
    {
        Task<BalanceUpDayModel> GetBalanceUpDay();
        IEnumerable<string> GetBetTypeName(IEnumerable<int> betTypes);
    }

    public class ReportService : IReportService
    {
        private readonly IDynamicRepository dynamicRepository;
        private readonly IRemotingRefService remotingRefService;
        private readonly ICurrentContextService currentContextService;
        private readonly ICacheService memoryCacheService;

        public ReportService(
            IDynamicRepository dynamicRepository,
            IRemotingRefService remotingRefService,
            ICurrentContextService currentContextService,
            ICacheContainer cacheContainer)
        {
            this.dynamicRepository = dynamicRepository;
            this.remotingRefService = remotingRefService;
            this.currentContextService = currentContextService;
            memoryCacheService = cacheContainer.MemoryCacheService;
        }

        public async Task<BalanceUpDayModel> GetBalanceUpDay()
        {
            return await memoryCacheService.GetOrSetAsync("balanceUpDay", async () =>
            {
                return await dynamicRepository.GetAsync<BalanceUpDayModel>(new GetBalanceUpDayCriteria()).ConfigureAwait(false);
            }, new CacheItemOptions().SetAbsoluteExpiration(TimeSpan.FromDays(1))).ConfigureAwait(false);
        }

        public IEnumerable<string> GetBetTypeName(IEnumerable<int> betTypes)
        {
            var languageCode = currentContextService.GetLanguageCode();
            return betTypes.Select(x => remotingRefService.GetBetTypeName(x.ToString(), languageCode));
        }
    }
}
