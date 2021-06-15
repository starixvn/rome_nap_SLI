namespace NAP.SLI.MatchWinLossDetail.Controllers
{
    using System.Threading.Tasks;
    using MediatR;
    using Microsoft.AspNetCore.Mvc;
    using NAP.SLI.Common.Extensions;
    using NAP.SLI.Common.Models;
    using NAP.SLI.MatchWinLossDetail.Requests;

    [ApiController]
    [Route("api/match-win-loss-detail")]
    public class MatchWinLossDetailController : ControllerBase
    {
        private readonly IMediator mediator;

        public MatchWinLossDetailController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> Query([FromBody] QueryRequest request)
        {
            var result = await mediator.Send(request).ConfigureAwait(false);
            return Ok(result);
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> Excel([FromBody] ExcelRequest request)
        {
            var fileContents = await mediator.Send(request).ConfigureAwait(false);
            return File(
                fileContents: fileContents,
                contentType: ContentTypes.Excel,
                fileDownloadName: $"{string.Join("-", "Match Win Loss Detail", request.Username, request.FromDate.ToDateString(), request.ToDate.ToDateString())}.xls"
            );
        }
    }
}
