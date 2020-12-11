using Fanex.Caching;
using Fanex.Caching.Memory;
using Fanex.Caching.Redis;
using Microsoft.Extensions.DependencyInjection;

namespace NAP.SLI.Common.Services
{
    public interface ICacheContainer
    {
        ICacheService MemoryCacheService { get; }

        ICacheService RedisCacheService { get; }
    }

    public class CacheContainer : ICacheContainer
    {
        private readonly ICacheService memoryCacheService;
        private readonly ICacheService redisCacheService;

        public CacheContainer(MemoryCacheOptions memoryCacheOptions, RedisCacheOptions redisCacheOptions)
        {
            memoryCacheService = new CacheService(new MemoryCache(memoryCacheOptions));
            redisCacheService = new CacheService(new RedisCache(redisCacheOptions));
        }

        public ICacheService MemoryCacheService => memoryCacheService;

        public ICacheService RedisCacheService => redisCacheService;
    }
}