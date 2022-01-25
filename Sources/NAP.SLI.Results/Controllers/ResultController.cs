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

        /// <summary>Get Sports</summary>
        [HttpPost("[action]")]
        [ProducesResponseType(typeof(IEnumerable<SportModel>), StatusCodes.Status200OK)]
        [Produces(MediaTypeNames.Application.Json)]
        public async Task<IActionResult> GetSports([FromBody] GetSportsRequest request)
        {
            var results = await mediator.Send(request).ConfigureAwait(false);
            return Ok(results);
        }

        /// <summary>Get Leagues</summary>
        [HttpPost("[action]")]
        [ProducesResponseType(typeof(IEnumerable<LeagueModel>), StatusCodes.Status200OK)]
        [Produces(MediaTypeNames.Application.Json)]
        public async Task<IActionResult> GetLeagues([FromBody] GetLeaguesRequest request)
        {
            var results = await mediator.Send(request).ConfigureAwait(false);
            return Ok(results);
        }

        /// <summary>Get Results By Date</summary>
        [HttpPost("[action]")]
        public async Task<IActionResult> GetResultsByDate([FromBody] GetResultsByDateRequest request)
        {
            var results = await mediator.Send(request).ConfigureAwait(false);
            return Ok(results);
        }

        /// <summary>Get Result By Match</summary>
        [HttpPost("[action]")]
        [Produces(MediaTypeNames.Application.Json)]
        public async Task<IActionResult> GetResultByMatch([FromBody] GetResultByMatchRequest request)
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
                fileDownloadName: $"{string.Join("-", "Results", request.EventDate.ToDateString(), request.SportName, request.LeagueName)}.xls"
            );
        }
    }
}