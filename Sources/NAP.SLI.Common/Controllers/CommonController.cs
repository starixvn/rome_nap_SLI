namespace NAP.SLI.Common.Controllers
{
    using System;
    using System.Diagnostics;
    using System.IO;
    using System.Text;
    using System.Threading.Tasks;
    using Fanex.Caching;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using NAP.SLI.Common.Models;
    using NAP.SLI.Common.Services;
    using NAP.SLI.Localization.Services;
    using NAP.UM.Web;

    [AllowAnonymous]
    [UncheckUMFilter]
    [ApiController]
    [Route("api/[controller]")]
    public class CommonController : ControllerBase
    {
        private readonly HttpContext context;
        private readonly IAppSettings appSettings;
        private readonly IReportService reportService;
        private readonly ICacheService memoryCacheService;
        private readonly ISharedLocalizer sharedLocalizer;

        public CommonController(
            IHttpContextAccessor httpContextAccessor,
            IAppSettings appSettings,
            IReportService reportService,
            ICacheContainer cacheContainer,
            ISharedLocalizer sharedLocalizer)
        {
            context = httpContextAccessor.HttpContext;
            this.appSettings = appSettings;
            this.reportService = reportService;
            memoryCacheService = cacheContainer.MemoryCacheService;
            this.sharedLocalizer = sharedLocalizer;
        }

        [HttpPost("[action]")]
        public void Exception()
        {
            var title = sharedLocalizer["Title"];
            throw new NotSupportedException(title);
        }

        [HttpGet("[action]")]
        public async Task<ActionResult> Configuration()
        {
            var content = await memoryCacheService.GetOrSetAsync("configuration", async () =>
            {
                var content = await System.IO.File.ReadAllTextAsync(Path.Combine(appSettings.AppDataPath, "configuration.js")).ConfigureAwait(false);
                var configurationModel = await GetConfigurationAsync().ConfigureAwait(false);
                var properties = configurationModel.GetType().GetProperties();
                foreach (var property in properties)
                {
                    var value = property.GetValue(configurationModel).ToString();
                    content = content.Replace("{{" + property.Name + "}}", value);
                }

                return content;
            }, new CacheItemOptions().SetAbsoluteExpiration(TimeSpan.FromDays(1))).ConfigureAwait(false);
            return Content(content, "application/javascript", Encoding.UTF8);
        }

        private async Task<ConfigurationModel> GetConfigurationAsync()
        {
            var model = await reportService.GetBalanceUpDay().ConfigureAwait(false);
            return new ConfigurationModel
            {
                Environment = appSettings.Environment,
                FrontEndSentryDsn = appSettings.FrontEndSentryDsn,
                BalanceUpDay = model.BalanceUpDay.ToString("s"),
                Today = DateTime.Now.Date.ToString("s")
        };
    }

    [HttpGet("[action]")]
    public async Task<ActionResult> SystemInformation()
    {
        return Ok(new
        {
            CpuPercentage = await GetCpuUsageForProcess().ConfigureAwait(false),
            Environment.WorkingSet,
            Environment.OSVersion,
            Environment.Is64BitOperatingSystem,
            Environment.MachineName,
            RemoteIpAddress = context.Connection.RemoteIpAddress.ToString()
        });
    }

    private static async Task<int> GetCpuUsageForProcess()
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
