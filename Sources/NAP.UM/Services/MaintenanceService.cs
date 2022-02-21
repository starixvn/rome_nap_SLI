using System;
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
        private readonly HttpClient httpClient;

        public MaintenanceService(UMConfig umConfig, MemoryCacheOptions cacheOptions, HttpClient httpClient)
        {
            this.umConfig = umConfig;
            cacheService = new CacheService(new MemoryCache(cacheOptions));
            this.httpClient = httpClient;
        }

        public bool IsEnabled => umConfig.Enabled;

        public async Task<bool> IsValidTokenAsync(string token)
        {
            var url = $"/token/validate?SiteId={umConfig.SiteId}&Token={token}";
            return await SendAsync<bool>(url, HttpMethod.Get).ConfigureAwait(false);
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

            var cacheTimeSpan = TimeSpan.FromSeconds(umConfig.CacheDuration);
            var cacheItemOptions = new CacheItemOptions().SetAbsoluteExpiration(cacheTimeSpan);
            return await cacheService.GetOrSetAsync(CacheKey, async () =>
            {
                var url = $"/UnderMaintenance/get?siteId={umConfig.SiteId}";
                var umTime = await SendAsync<UMTime>(url, HttpMethod.Get).ConfigureAwait(false);
                if (umTime == null)
                {
                    umTime = new UMTime
                    {
                        IsUnderMaintenanceTime = false
                    };
                }

                return umTime;
            }, cacheItemOptions).ConfigureAwait(false);
        }

        private async Task<T> SendAsync<T>(string endPoint, HttpMethod httpMethod)
        {
            try
            {
                var request = new HttpRequestMessage
                {
                    RequestUri = new Uri($"{umConfig.ServiceUri}{endPoint}"),
                    Method = httpMethod
                };
                request.AddHMAC(umConfig.SecretKey);
                var response = await httpClient.SendAsync(request).ConfigureAwait(false);
                response.EnsureSuccessStatusCode();
                return await response.Content.ReadFromJsonAsync<T>().ConfigureAwait(false);
            }
            catch (Exception ex)
            {
                await ExceptionHandler.HandleAsync(ex, null).ConfigureAwait(false);
                return default;
            }
        }
    }
}