namespace NAP.SLI.WinLossAnalysis.Controllers
{
    using System.Threading.Tasks;
    using MediatR;
    using Microsoft.AspNetCore.Mvc;
    using NAP.SLI.Common.Extensions;
    using NAP.SLI.Common.Models;
    using NAP.SLI.WinLossAnalysis.Requests;

    [ApiController]
    [Route("api/win-loss-analysis")]
    public class WinLossAnalysisController : ControllerBase
    {
        private readonly IMediator mediator;

        public WinLossAnalysisController(IMediator mediator)
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
                fileDownloadName: $"{string.Join("-", "Win Loss Analysis", request.Username, request.FromDate.ToDateString(), request.ToDate.ToDateString())}.xls"
            );
        }
    }
}
