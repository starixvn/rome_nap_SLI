namespace NAP.SLI.Results.Controllers
{
    using System.Threading.Tasks;
    using MediatR;
    using Microsoft.AspNetCore.Mvc;
    using NAP.SLI.Results.Requests;

    [ApiController]
    [Route("api/thirdpartyresult")]
    public class ThirdPartyResultController : ControllerBase
    {
        private readonly IMediator mediator;

        public ThirdPartyResultController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> GetHappy5LinkedGameResult([FromBody] Happy5LinkedGameResultRequest request)
        {
            var result = await mediator.Send(request).ConfigureAwait(false);
            return Ok(result);
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> GetSoccer5Result([FromBody] Soccer5ResultRequest request)
        {
            var result = await mediator.Send(request).ConfigureAwait(false);
            return Ok(result);
        }
    }
}