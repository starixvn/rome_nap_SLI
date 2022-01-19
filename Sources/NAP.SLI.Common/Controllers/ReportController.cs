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

        /// <summary>Bet Type Name</summary>
        [HttpPost("[action]")]
        [ProducesResponseType(typeof(IEnumerable<string>), StatusCodes.Status200OK)]
        public ActionResult BetTypeNames(IEnumerable<int> betTypes)
        {
            return Ok(reportService.GetBetTypeNames(betTypes));
        }

        /// <summary>Sport Type Name</summary>
        [HttpPost("[action]")]
        [ProducesResponseType(typeof(IEnumerable<string>), StatusCodes.Status200OK)]
        public ActionResult SportTypeNames(IEnumerable<int> sportTypes)
        {
            return Ok(reportService.GetSportTypeNames(sportTypes));
        }
    }
}
