namespace NAP.SLI.Results.Controllers
{
    using System.Threading.Tasks;
    using MediatR;
    using Microsoft.AspNetCore.Mvc;
    using NAP.SLI.Results.Requests;

    [ApiController]
    [Route("api/results")]
    public class ResultsController : ControllerBase
    {
        private readonly IMediator mediator;

        public ResultsController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> QueryDetail([FromBody] DetailRequest request)
        {
            var result = await mediator.Send(request).ConfigureAwait(false);
            return Ok(result);
        }
    }
}