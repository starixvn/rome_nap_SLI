using System;
using System.Threading.Tasks;
using AutoMapper;
using Fanex.Caching;
using Fanex.Data.Repository;
using NAP.SLI.Account.Criteria;
using NAP.SLI.Account.Models;
using NAP.SLI.Account.Requests;
using NAP.SLI.Common.Extensions;
using NAP.SLI.Common.Models;
using NAP.SLI.Common.Services;

namespace NAP.SLI.Account.Services
{
    public interface IAuthenticationService
    {
        Task<AuthenticationModel> Login(LoginRequest request);

        Task<ResultModel> ReCheckin(ReCheckinRequest request);
    }

    public class AuthenticationService : IAuthenticationService
    {
        private const int ConnectionCacheTimeInDays = 1;
        private readonly ITokenManager tokenService;
        private readonly IDynamicRepository dynamicRepository;
        private readonly ICurrentContextService currentContextService;
        private readonly ICurrentUserService currentUserService;
        private readonly IMapper mapper;
        private readonly ICacheService cacheService;

        public AuthenticationService(
            ITokenManager tokenService,
            IDynamicRepository dynamicRepository,
            ICurrentContextService currentContextService,
            ICurrentUserService currentUserService,
            IMapper mapper,
            ICacheContainer cacheContainer
            )
        {
            this.tokenService = tokenService;
            this.dynamicRepository = dynamicRepository;
            this.currentContextService = currentContextService;
            this.currentUserService = currentUserService;
            this.mapper = mapper;
            cacheService = cacheContainer.RedisCacheService;
        }

        public async Task<AuthenticationModel> Login(LoginRequest request)
        {
            var criteria = new LoginCriteria
            {
                Username = request.Username,
                Password = request.Password,
                LoginIP = currentContextService.GetIP(),
                LoginDomain = currentContextService.GetDomainName(),
                BrowserName = currentContextService.GetBrowserName(),
                CountryCode = currentContextService.GetCountryCode(),
                Platform = currentContextService.GetPlatform()
            };
            criteria.ThrowExceptionIfInvalid();
            await dynamicRepository.ExecuteAsync(criteria).ConfigureAwait(false);
            var loginResult = mapper.Map<AuthenticationModel>(criteria);
            if (!loginResult.IsSuccess)
            {
                return loginResult;
            }

            var cacheKey = GenerateCacheKey(loginResult.UserId);
            var connectionId = Guid.NewGuid().ToString();
            var cacheItemOptions = new CacheItemOptions().SetAbsoluteExpiration(TimeSpan.FromDays(ConnectionCacheTimeInDays));
            await cacheService.SetAsync(cacheKey, connectionId, cacheItemOptions).ConfigureAwait(false);
            loginResult.ConnectionId = connectionId;

            var tokenModel = new TokenModel(request.Username, loginResult.UserId, loginResult.GroupId);
            loginResult.Token = tokenService.Generate(tokenModel);

            return loginResult;
        }

        public async Task<ResultModel> ReCheckin(ReCheckinRequest request)
        {
            var cacheKey = GenerateCacheKey(currentUserService.UserId);
            var connectionId = await cacheService.GetAsync<string>(cacheKey).ConfigureAwait(false);
            if (connectionId == request.ConnectionId)
            {
                return ResultModel.Success;
            }

            return new ResultModel
            {
                ErrCode = ErrorCodes.GenericError
            };
        }

        private string GenerateCacheKey(int userId)
        {
            return $"{this.GetType().FullName}_{userId}";
        }
    }
}