namespace NAP.SLI.Results.Controllers
{
    using System.Net.Mime;
    using System.Threading.Tasks;
    using MediatR;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using NAP.SLI.Results.Requests;

    [Consumes(MediaTypeNames.Application.Json)]
    [Produces(MediaTypeNames.Application.Json)]
    [ApiController]
    [Route("api/third-party-result")]
    public class ThirdPartyResultController : ControllerBase
    {
        private readonly IMediator mediator;

        public ThirdPartyResultController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        /// <summary>Get Happy5 Linked Game</summary>
        [HttpPost("[action]")]
        [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
        public async Task<IActionResult> QueryHappy5LinkedGameResult([FromBody] QueryHappy5LinkedGameResultRequest request)
        {
            var result = await mediator.Send(request).ConfigureAwait(false);
            return Ok(result);
        }

        /// <summary>Get Soccer 5</summary>
        [HttpPost("[action]")]
        [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
        public async Task<IActionResult> QuerySoccer5Result([FromBody] QuerySoccer5ResultRequest request)
        {
            var result = await mediator.Send(request).ConfigureAwait(false);
            return Ok(result);
        }
    }
}