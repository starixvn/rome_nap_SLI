namespace NAP.SLI.Common.Controllers
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using NAP.SLI.Common.Services;

    [ApiController]
    [Route("api/[controller]")]
    public class ReportController : ControllerBase
    {
        private readonly IReportService reportService;

        public ReportController(
            IReportService reportService)
        {
            this.reportService = reportService;
        }

        [HttpGet("[action]")]
        public ActionResult BetTypeName(IEnumerable<int> betTypes)
        {
            return Ok(reportService.GetBetTypeName(betTypes));
        }

        [HttpGet("balance-up-day")]
        public async Task<IActionResult> BalanceUpDay()
        {
            var result = await reportService.GetBalanceUpDay().ConfigureAwait(false);
            return Ok(result);
        }
    }
}
