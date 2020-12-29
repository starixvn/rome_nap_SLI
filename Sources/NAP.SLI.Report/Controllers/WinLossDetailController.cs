namespace NAP.SLI.Report.Controllers
{
    using System.Threading.Tasks;
    using MediatR;
    using Microsoft.AspNetCore.Mvc;
    using NAP.SLI.Report.Requests;

    [ApiController]
    [Route("api/[controller]")]
    public class WinLossDetailController : ControllerBase
    {
        private readonly IMediator mediator;

        public WinLossDetailController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> Query([FromBody] WinLossDetailQueryRequest request)
        {
            var result = await mediator.Send(request).ConfigureAwait(false);
            return Ok(result);
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> Excel([FromBody] WinLossDetailExcelRequest request)
        {
            var result = await mediator.Send(request).ConfigureAwait(false);
            return Ok(result);
        }
    }
}
