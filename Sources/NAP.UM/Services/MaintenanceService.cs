using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using Fanex.Caching;
using Fanex.Caching.Memory;
using Fanex.Logging.Extensions.AspNetCore;
using NAP.UM.Extensions;
using NAP.UM.Models;

namespace NAP.UM.Services
{
    public interface IMaintenanceService
    {
        bool IsEnabled { get; }

        Task<bool> IsValidTokenAsync(string token);

        Task<UMTime> GetUMTimeAsync();
    }

    public class MaintenanceService : IMaintenanceService
    {
        private const string CacheKey = "NAP.UM.Services.MaintenanceService";
        private readonly UMConfig umConfig;
        private readonly ICacheService cacheService;

        public MaintenanceService(UMConfig umConfig, MemoryCacheOptions cacheOptions)
        {
            this.umConfig = umConfig;
            cacheService = new CacheService(new MemoryCache(cacheOptions));
        }

        public bool IsEnabled => umConfig.Enabled;

        public async Task<bool> IsValidTokenAsync(string token)
        {
            var url = $"/token/validate?SiteId={umConfig.SiteId}&Token={token}";
            return await GetAsync<bool>(url).ConfigureAwait(false);
        }

        public async Task<UMTime> GetUMTimeAsync()
        {
            if (umConfig.UnscheduleEnabled)
            {
                return new UMTime
                {
                    From = umConfig.UnscheduleFrom,
                    To = umConfig.UnscheduleTo,
                    IsUnderMaintenanceTime = true
                };
            }

            var umTimes = await GetUMTimesAsync().ConfigureAwait(false);
            if (umTimes.ContainsKey(umConfig.SiteId))
            {
                return umTimes[umConfig.SiteId];
            }

            return new UMTime();
        }

        private async Task<Dictionary<int, UMTime>> GetUMTimesAsync()
        {
            var cacheTimeSpan = TimeSpan.FromSeconds(umConfig.CacheDuration);
            var cacheItemOptions = new CacheItemOptions().SetAbsoluteExpiration(cacheTimeSpan);
            return await cacheService.GetOrSetAsync<Dictionary<int, UMTime>>(CacheKey, async () =>
            {
                var url = "/UnderMaintenance/GetAll";
                return await GetAsync<Dictionary<int, UMTime>>(url).ConfigureAwait(false);
            }, cacheItemOptions).ConfigureAwait(false);
        }

        private Task<T> GetAsync<T>(string endPoint)
        {
            return SendAsync<T>(endPoint, HttpMethod.Get);
        }

        private async Task<T> SendAsync<T>(string endPoint, HttpMethod httpMethod)
        {
            try
            {
                using (var client = new HttpClient())
                {
                    var request = new HttpRequestMessage
                    {
                        RequestUri = new Uri($"{umConfig.ServiceUri}{endPoint}"),
                        Method = httpMethod
                    };
                    request.AddHMAC(umConfig.SecretKey);
                    var response = await client.SendAsync(request).ConfigureAwait(false);
                    response.EnsureSuccessStatusCode();
                    return await response.Content.ReadFromJsonAsync<T>().ConfigureAwait(false);
                }
            }
            catch (Exception ex)
            {
                await ExceptionHandler.HandleAsync(ex, null).ConfigureAwait(false);
                return default(T);
            }
        }
    }
}