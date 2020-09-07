namespace NAP.SLI.Common.Controllers
{
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Diagnostics;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.Mvc;
    using System;
    using System.Net;

    [ApiController]
    [AllowAnonymous]
    public class ErrorController : ControllerBase
    {
        [Route("/error-local-development")]
        public IActionResult ErrorLocalDevelopment([FromServices] IHostingEnvironment webHostEnvironment)
        {
            if (!webHostEnvironment.IsDevelopment())
            {
                throw new InvalidOperationException(
                    "This shouldn't be invoked in non-development environments.");
            }

            var feature = HttpContext.Features.Get<IExceptionHandlerPathFeature>();
            var ex = feature?.Error;

            var problemDetails = new ProblemDetails
            {
                Status = (int)HttpStatusCode.InternalServerError,
                Instance = feature?.Path,
                Title = ex.GetType().Name,
                Detail = ex.StackTrace,
            };

            return StatusCode(problemDetails.Status.Value, problemDetails);
        }

        [Route("/error")]
        public ActionResult Error([FromServices] IHostingEnvironment webHostEnvironment)
        {
            var feature = HttpContext.Features.Get<IExceptionHandlerPathFeature>();
            var ex = feature?.Error;
            var isDev = webHostEnvironment.IsDevelopment();
            var problemDetails = new ProblemDetails
            {
                Status = (int)HttpStatusCode.InternalServerError,
                Instance = feature?.Path,
                Title = isDev ? $"{ex.GetType().Name}: {ex.Message}" : "An error occurred.",
                Detail = isDev ? ex.StackTrace : null,
            };

            return StatusCode(problemDetails.Status.Value, problemDetails);
        }
    }
}
