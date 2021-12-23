namespace NAP.SLI.WinLossDetail.Controllers
{
    using System.Net.Mime;
    using System.Threading.Tasks;
    using MediatR;
    using Microsoft.AspNetCore.Mvc;
    using NAP.SLI.Common.Extensions;
    using NAP.SLI.Common.Models;
    using NAP.SLI.WinLossDetail.Requests;

    [Consumes(MediaTypeNames.Application.Json)]
    [ApiController]
    [Route("api/win-loss-detail")]
    public class WinLossDetailController : ControllerBase
    {
        private readonly IMediator mediator;

        public WinLossDetailController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        /// <summary>Query</summary>
        [HttpPost("[action]")]
        [Produces(MediaTypeNames.Application.Json)]
        public async Task<IActionResult> Query([FromBody] QueryRequest request)
        {
            var result = await mediator.Send(request).ConfigureAwait(false);
            return Ok(result);
        }

        /// <summary>Excel</summary>
        [HttpPost("[action]")]
        public async Task<IActionResult> Excel([FromBody] ExcelRequest request)
        {
            var fileContents = await mediator.Send(request).ConfigureAwait(false);
            return File(
                fileContents: fileContents,
                contentType: ContentTypes.Excel,
                fileDownloadName: $"{string.Join("-", "Win Loss Detail", request.Username, request.FromDate.ToDateString(), request.ToDate.ToDateString())}.xls"
            );
        }
    }
}
