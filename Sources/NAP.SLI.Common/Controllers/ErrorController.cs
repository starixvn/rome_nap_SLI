namespace NAP.SLI.Common.Controllers
{
    using System.Net;
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
        [Route("/error")]
        public async Task<IActionResult> Error()
        {
            var context = HttpContext.Features.Get<IExceptionHandlerFeature>();
            var error = context.Error;
            await ExceptionHandler.HandleAsync(error, HttpContext);
            return Problem(
                statusCode: (int)HttpStatusCode.InternalServerError,
                detail: error.Message,
                title: "System Error");
        }
    }
}
