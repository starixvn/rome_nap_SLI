namespace NAP.SLI.WinLossDetail.Controllers
{
    using System.Threading.Tasks;
    using MediatR;
    using Microsoft.AspNetCore.Mvc;
    using NAP.SLI.Common.Models;
    using NAP.SLI.WinLossDetail.Requests;

    [ApiController]
    [Route("api/win-loss-detail")]
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
            var fileContents = await mediator.Send(request).ConfigureAwait(false);
            return File(
                fileContents: fileContents,
                contentType: ContentTypes.Excel,
                fileDownloadName: request.GetDownloadFileName()
            );
        }
    }
}
