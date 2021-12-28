namespace NAP.SLI.BetList.Controller
{
    using System.Net.Mime;
    using System.Threading.Tasks;
    using MediatR;
    using Microsoft.AspNetCore.Mvc;
    using NAP.SLI.BetList.Requests;

    [Consumes(MediaTypeNames.Application.Json)]
    [Produces(MediaTypeNames.Application.Json)]
    [ApiController]
    [Route("api/bet-list")]
    public class BetListController : ControllerBase
    {
        private readonly IMediator mediator;

        public BetListController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        /// <summary>Get By Date</summary>
        [HttpPost("[action]")]
        public async Task<IActionResult> GetByDate([FromBody] QueryByDateRequest request)
        {
            var result = await mediator.Send(request).ConfigureAwait(false);
            return Ok(result);
        }

        /// <summary>Get By Match</summary>
        [HttpPost("[action]")]
        public async Task<IActionResult> GetByMatch([FromBody] QueryByMatchRequest request)
        {
            var result = await mediator.Send(request).ConfigureAwait(false);
            return Ok(result);
        }

        /// <summary>Get By Bettype</summary>
        [HttpPost("[action]")]
        public async Task<IActionResult> GetByBettype([FromBody] QueryByBetTypeRequest request)
        {
            var result = await mediator.Send(request).ConfigureAwait(false);
            return Ok(result);
        }
    }
}