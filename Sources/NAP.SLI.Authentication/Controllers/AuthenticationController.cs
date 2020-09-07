namespace NAP.SLI.Authentication.Controllers
{
    using MediatR;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using NAP.SLI.Authentication.Requests;
    using System.Threading.Tasks;

    [ApiController]
    [Route("api/[controller]")]
    public class AuthenticationController : Controller
    {
        private readonly IMediator mediator;

        public AuthenticationController(IMediator mediator)
            => (this.mediator) = (mediator);

        [AllowAnonymous]
        [HttpPost("[action]")]
        public async Task<IActionResult> Login([FromBody]LoginRequest request)
        {
            var loginResult = await mediator.Send(request);
            if (!loginResult.IsSuccessful)
            {
                return BadRequest(loginResult.ErrMsg);
            }

            return Ok(loginResult);
        }
    }
}
