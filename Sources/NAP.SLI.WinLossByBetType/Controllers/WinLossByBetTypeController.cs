namespace NAP.SLI.WinLossByBetType.Controllers
{
    using System.Threading.Tasks;
    using MediatR;
    using Microsoft.AspNetCore.Mvc;
    using NAP.SLI.Common.Extensions;
    using NAP.SLI.Common.Models;
    using NAP.SLI.WinLossByBetType.Requests;

    [ApiController]
    [Route("api/win-loss-by-bet-type")]
    public class WinLossByBetTypeController : ControllerBase
    {
        private readonly IMediator mediator;

        public WinLossByBetTypeController(IMediator mediator)
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
                fileDownloadName: $"{string.Join("-", "Win Loss By Bettype", request.Username, request.FromDate.ToDateString(), request.ToDate.ToDateString())}.xls"
            );
        }
    }
}
