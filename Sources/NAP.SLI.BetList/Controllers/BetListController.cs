namespace NAP.SLI.BetList.Controller
{
    using System.Threading.Tasks;
    using MediatR;
    using Microsoft.AspNetCore.Mvc;
    using NAP.SLI.BetList.Requests;

    [ApiController]
    [Route("api/bet-list")]
    public class BetListController : ControllerBase
    {
        private readonly IMediator mediator;

        public BetListController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> GetByDate([FromBody] QueryByDateRequest request)
        {
            var result = await mediator.Send(request).ConfigureAwait(false);
            return Ok(result);
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> GetByMatch([FromBody] QueryByMatchRequest request)
        {
            var result = await mediator.Send(request).ConfigureAwait(false);
            return Ok(result);
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> GetByBettype([FromBody] QueryByBettypeRequest request)
        {
            var result = await mediator.Send(request).ConfigureAwait(false);
            return Ok(result);
        }
    }
}