namespace NAP.SLI.Results.Controllers
{
    using System.Threading.Tasks;
    using MediatR;
    using Microsoft.AspNetCore.Mvc;
    using NAP.SLI.Results.Requests;

    [ApiController]
    [Route("api/result")]
    public class ResultController : ControllerBase
    {
        private readonly IMediator mediator;

        public ResultController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> GetResultSportByDate([FromBody] ResultSportByDateRequest request)
        {
            var results = await mediator.Send(request).ConfigureAwait(false);
            return Ok(results);
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> GetResultLeagueByDate([FromBody] ResultLeagueByDateRequest request)
        {
            var results = await mediator.Send(request).ConfigureAwait(false);
            return Ok(results);
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> GetNumberGameResult([FromBody] NumberGameResultRequest request)
        {
            var results = await mediator.Send(request).ConfigureAwait(false);
            return Ok(results);
        }
    }
}