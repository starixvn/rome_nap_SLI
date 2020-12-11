namespace NAP.SLI.Common.Controllers
{
    using System;
    using System.Diagnostics;
    using System.IO;
    using System.Threading.Tasks;
    using Fanex.Caching;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using NAP.SLI.Common.Services;

    [AllowAnonymous]
    [ApiController]
    [Route("api/[controller]")]
    public class CommonController : ControllerBase
    {
        private readonly HttpContext context;
        private readonly IAppSettings appSettings;
        private readonly ICacheService memoryCacheService;

        public CommonController(IHttpContextAccessor httpContextAccessor, IAppSettings appSettings, ICacheContainer cacheContainer)
            => (context, this.appSettings, memoryCacheService) = (httpContextAccessor.HttpContext, appSettings, cacheContainer.MemoryCacheService);

        [HttpGet("[action]")]
        public void Exception()
        {
            throw new NotSupportedException("Test");
        }

        [HttpGet("[action]")]
        public async Task<ActionResult> Configuration()
        {
            var content = await memoryCacheService.GetOrSetAsync<string>("configuration", async () =>
            {
                var content = await System.IO.File.ReadAllTextAsync(Path.Combine(appSettings.AppDataPath, "configuration.js")).ConfigureAwait(false);
                return content.Replace("{{SentryDsn}}", appSettings.SentryDsn);
            }, new CacheItemOptions().SetAbsoluteExpiration(TimeSpan.FromDays(1))).ConfigureAwait(false);
            return Content(content);
        }

        [HttpGet("[action]")]
        public async Task<ActionResult> SystemInformation()
        {
            return Ok(new
            {
                CpuPercentage = await GetCpuUsageForProcess().ConfigureAwait(false),
                WorkingSet = Environment.WorkingSet,
                OSVersion = Environment.OSVersion,
                Is64BitOperatingSystem = Environment.Is64BitOperatingSystem,
                MachineName = Environment.MachineName,
                RemoteIpAddress = context.Connection.RemoteIpAddress.ToString()
            });
        }

        private async Task<int> GetCpuUsageForProcess()
        {
            var startTime = DateTime.UtcNow;
            var startCpuUsage = Process.GetCurrentProcess().TotalProcessorTime;
            // Wait 1 second
            await Task.Delay(1000);

            var endTime = DateTime.UtcNow;
            var endCpuUsage = Process.GetCurrentProcess().TotalProcessorTime;
            var cpuUsedMs = (endCpuUsage - startCpuUsage).TotalMilliseconds;
            var totalMsPassed = (endTime - startTime).TotalMilliseconds;
            var cpuUsageTotal = cpuUsedMs / (Environment.ProcessorCount * totalMsPassed);

            return Convert.ToInt32(cpuUsageTotal * 100);
        }
    }
}
