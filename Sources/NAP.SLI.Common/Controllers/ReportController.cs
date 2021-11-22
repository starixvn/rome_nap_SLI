namespace NAP.SLI.Common.Controllers
{
    using System.Collections.Generic;
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
    }
}
