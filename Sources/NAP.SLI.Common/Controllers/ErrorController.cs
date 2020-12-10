namespace NAP.SLI.Common.Controllers
{
    using System.Threading.Tasks;
    using Fanex.Logging.Extensions.AspNetCore;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Diagnostics;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;

    [AllowAnonymous]
    [ApiController]
    public class ErrorController : ControllerBase
    {
        [Route("[action]")]
        public async Task<IActionResult> Error()
        {
            var context = HttpContext.Features.Get<IExceptionHandlerFeature>();
            await ExceptionHandler.HandleAsync(context.Error, HttpContext).ConfigureAwait(false);
            return Problem(
                statusCode: StatusCodes.Status500InternalServerError,
                title: "Internal Server Error");
        }
    }
}
