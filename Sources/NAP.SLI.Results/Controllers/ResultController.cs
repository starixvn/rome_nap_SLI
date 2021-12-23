namespace NAP.SLI.Results.Controllers
{
    using System.Collections.Generic;
    using System.Net.Mime;
    using System.Threading.Tasks;
    using MediatR;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using NAP.SLI.Common.Extensions;
    using NAP.SLI.Common.Models;
    using NAP.SLI.Results.Models;
    using NAP.SLI.Results.Requests;

    [Consumes(MediaTypeNames.Application.Json)]
    [ApiController]
    [Route("api/result")]
    public class ResultController : ControllerBase
    {
        private readonly IMediator mediator;

        public ResultController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        /// <summary>Get Result Sport By Date</summary>
        [HttpPost("[action]")]
        [ProducesResponseType(typeof(IEnumerable<ResultSportByDateModel>), StatusCodes.Status200OK)]
        [Produces(MediaTypeNames.Application.Json)]
        public async Task<IActionResult> GetResultSportByDate([FromBody] ResultSportByDateRequest request)
        {
            var results = await mediator.Send(request).ConfigureAwait(false);
            return Ok(results);
        }

        /// <summary>Get Result League By Date</summary>
        [HttpPost("[action]")]
        [ProducesResponseType(typeof(IEnumerable<ResultLeagueByDateModel>), StatusCodes.Status200OK)]
        [Produces(MediaTypeNames.Application.Json)]
        public async Task<IActionResult> GetResultLeagueByDate([FromBody] ResultLeagueByDateRequest request)
        {
            var results = await mediator.Send(request).ConfigureAwait(false);
            return Ok(results);
        }

        /// <summary>Get Result</summary>
        [HttpPost("[action]")]
        public async Task<IActionResult> GetResult([FromBody] ResultRequest request)
        {
            var results = await mediator.Send(request).ConfigureAwait(false);
            return Ok(results);
        }

        /// <summary>Excel</summary>
        [HttpPost("[action]")]
        public async Task<IActionResult> Excel([FromBody] ExcelRequest request)
        {
            var fileContents = await mediator.Send(request).ConfigureAwait(false);
            return File(
                fileContents: fileContents,
                contentType: ContentTypes.Excel,
                fileDownloadName: $"{string.Join("-", "Results", request.FromDate.ToDateString(), request.SportName, request.LeagueName)}.xls"
            );
        }
    }
}