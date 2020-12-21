namespace NAP.SLI.Common.Controllers
{
    using System;
    using System.Diagnostics;
    using System.IO;
    using System.Threading.Tasks;
    using AutoMapper;
    using Fanex.Caching;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using NAP.SLI.Common.Models;
    using NAP.SLI.Common.Services;
    using NAP.UM.Models;
    using NAP.UM.Services;
    using NAP.UM.Web;

    [AllowAnonymous]
    [UncheckUMFilter]
    [ApiController]
    [Route("api/[controller]")]
    public class CommonController : ControllerBase
    {
        private readonly HttpContext context;
        private readonly IAppSettings appSettings;
        private readonly ICacheService memoryCacheService;
        private readonly UMConfig umConfig;
        private readonly IMaintenanceService maintenanceService;
        private readonly IMapper mapper;

        public CommonController(
            IHttpContextAccessor httpContextAccessor,
            IAppSettings appSettings,
            ICacheContainer cacheContainer,
            UMConfig umConfig,
            IMaintenanceService maintenanceService,
            IMapper mapper)
        {
            context = httpContextAccessor.HttpContext;
            this.appSettings = appSettings;
            memoryCacheService = cacheContainer.MemoryCacheService;
            this.umConfig = umConfig;
            this.maintenanceService = maintenanceService;
            this.mapper = mapper;
        }

        [HttpPost("[action]")]
        public void Exception()
        {
            throw new NotSupportedException("Test");
        }

        [HttpPost("[action]")]
        public void ToggleUM()
        {
            umConfig.UnscheduleEnabled = !umConfig.UnscheduleEnabled;
        }

        [HttpGet("[action]")]
        public async Task<ActionResult> Configuration()
        {
            var content = await memoryCacheService.GetOrSetAsync<string>("configuration", async () =>
            {
                var content = await System.IO.File.ReadAllTextAsync(Path.Combine(appSettings.AppDataPath, "configuration.js")).ConfigureAwait(false);
                var configurationModel = mapper.Map<ConfigurationModel>(appSettings);
                var properties = configurationModel.GetType().GetProperties();
                foreach (var property in properties)
                {
                    var value = property.GetValue(configurationModel).ToString();
                    content = content.Replace("{{" + property.Name + "}}", value);
                }

                return content;
            }, new CacheItemOptions().SetAbsoluteExpiration(TimeSpan.FromDays(1))).ConfigureAwait(false);
            return Content(content);
        }

        [HttpPost("[action]")]
        public async Task<ActionResult> UMTime()
        {
            return Ok(await maintenanceService.GetUMTimeAsync().ConfigureAwait(false));
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
            await Task.Delay(1000).ConfigureAwait(false);

            var endTime = DateTime.UtcNow;
            var endCpuUsage = Process.GetCurrentProcess().TotalProcessorTime;
            var cpuUsedMs = (endCpuUsage - startCpuUsage).TotalMilliseconds;
            var totalMsPassed = (endTime - startTime).TotalMilliseconds;
            var cpuUsageTotal = cpuUsedMs / (Environment.ProcessorCount * totalMsPassed);

            return Convert.ToInt32(cpuUsageTotal * 100);
        }
    }
}
