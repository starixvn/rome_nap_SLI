namespace NAP.SLI.Common.Controllers
{
    using System;
    using System.Diagnostics;
    using System.IO;
    using System.Net.Mime;
    using System.Text;
    using System.Threading.Tasks;
    using Fanex.Caching;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using NAP.SLI.Common.Models;
    using NAP.SLI.Common.Services;
    using NAP.SLI.Localization.Services;
    using NAP.UM.Models;
    using NAP.UM.Services;
    using NAP.UM.Web;

    [Consumes(MediaTypeNames.Application.Json)]
    [AllowAnonymous]
    [UncheckUMFilter]
    [ApiController]
    [Route("api/[controller]")]
    public class CommonController : ControllerBase
    {
        private readonly IAppSettings appSettings;
        private readonly IReportService reportService;
        private readonly ICacheService memoryCacheService;
        private readonly ISharedLocalizer sharedLocalizer;
        private readonly IMaintenanceService maintenanceService;

        public CommonController(
            IAppSettings appSettings,
            IReportService reportService,
            ICacheContainer cacheContainer,
            ISharedLocalizer sharedLocalizer,
            IMaintenanceService maintenanceService)
        {
            this.appSettings = appSettings;
            this.reportService = reportService;
            memoryCacheService = cacheContainer.MemoryCacheService;
            this.sharedLocalizer = sharedLocalizer;
            this.maintenanceService = maintenanceService;
        }

        [ApiExplorerSettings(IgnoreApi = true)]
        [HttpPost("[action]")]
        public void Exception()
        {
            var title = sharedLocalizer["Title"];
            throw new NotSupportedException(title);
        }

        /// <summary>Get UM Information</summary>
        [HttpPost("[action]")]
        [Produces(MediaTypeNames.Application.Json)]
        [ProducesResponseType(typeof(UMTime), StatusCodes.Status200OK)]
        public async Task<UMTime> UM()
        {
            return await maintenanceService.GetUMTimeAsync().ConfigureAwait(false);
        }

        /// <summary>Get System Configuration</summary>
        /// <response code="200">
        /// window.configuration = {
        ///     env: 'LOCAL',
        ///     sentryDsn: 'https://db0f69a2468845f3a267c95dd7d99d24@sentry.nexdev.net/138',
        ///     accessExpiration: '43200',
        ///     balanceUpDay: '2021-12-01T00:00:00',
        ///     today: '2021-12-28T00:00:00'
        /// };
        /// </response>
        [HttpGet("[action]")]
        [Produces("application/javascript")]
        [ProducesResponseType(StatusCodes.Status200OK)]
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
                AccessExpiration = appSettings.Authentication.AccessExpiration.ToString(),
                BalanceUpDay = model.BalanceUpDay.ToString("s"),
                Today = DateTime.Now.Date.ToString("s")
            };
        }
    }
}
