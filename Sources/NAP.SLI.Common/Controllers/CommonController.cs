namespace NAP.SLI.Common.Controllers
{
    using System;
    using System.Diagnostics;
    using System.Net;
    using System.Net.NetworkInformation;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;

    [AllowAnonymous]
    [ApiController]
    [Route("api/[controller]")]
    public class CommonController : ControllerBase
    {
        private readonly HttpContext context;

        public CommonController(IHttpContextAccessor httpContextAccessor)
            => (context) = (httpContextAccessor.HttpContext);

        [HttpGet("[action]")]
        public void Exception()
        {
            throw new NotSupportedException("Test");
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
