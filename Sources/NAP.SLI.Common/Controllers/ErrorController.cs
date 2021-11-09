namespace NAP.SLI.Common.Controllers
{
    using System.Threading.Tasks;
    using Fanex.Logging.Extensions.AspNetCore;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Diagnostics;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using NAP.SLI.Common.Services;

    [AllowAnonymous]
    [ApiController]
    public class ErrorController : ControllerBase
    {
        private readonly IAppSettings appSettings;

        public ErrorController(IAppSettings appSettings)
        {
            this.appSettings = appSettings;
        }

        [Route("/error")]
        [HttpGet("[action]")]
        public async Task<ActionResult> Error()
        {
            var isProd = appSettings.Environment == "PRO";
            var context = HttpContext.Features.Get<IExceptionHandlerFeature>();
            if (isProd)
            {
                await ExceptionHandler.HandleAsync(context.Error, HttpContext).ConfigureAwait(false);
                return Problem(
                                statusCode: StatusCodes.Status500InternalServerError,
                                title: "Internal Server Error");
            }
            else
            {
                return Problem(
                                statusCode: StatusCodes.Status500InternalServerError,
                                detail: context.Error.StackTrace,
                                title: context.Error.Message);
            }
        }
    }
}
