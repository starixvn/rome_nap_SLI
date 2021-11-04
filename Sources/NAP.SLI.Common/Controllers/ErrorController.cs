namespace NAP.SLI.Common.Controllers
{
    using System.Threading.Tasks;
    using Fanex.Logging.Extensions.AspNetCore;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Diagnostics;
    using Microsoft.AspNetCore.Hosting;
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
            var isDev = appSettings.Environment == "DEV";
            if (!isDev)
            {
                var context = HttpContext.Features.Get<IExceptionHandlerFeature>();
                await ExceptionHandler.HandleAsync(context.Error, HttpContext).ConfigureAwait(false);
            }

            return Problem(
                statusCode: StatusCodes.Status500InternalServerError,
                title: "Internal Server Error");
        }
    }
}
