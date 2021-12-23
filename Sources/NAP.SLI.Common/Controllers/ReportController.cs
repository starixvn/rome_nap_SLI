namespace NAP.SLI.Common.Controllers
{
    using System.Collections.Generic;
    using System.Net.Mime;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using NAP.SLI.Common.Services;

    [Consumes(MediaTypeNames.Application.Json)]
    [Produces(MediaTypeNames.Application.Json)]
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

        /// <summary>Bettype Name</summary>
        [HttpGet("[action]")]
        [ProducesResponseType(typeof(IEnumerable<string>), StatusCodes.Status200OK)]
        public ActionResult BetTypeName(IEnumerable<int> betTypes)
        {
            return Ok(reportService.GetBetTypeName(betTypes));
        }
    }
}
