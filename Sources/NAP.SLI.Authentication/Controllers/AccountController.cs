namespace NAP.SLI.Authentication.Controllers
{
    using MediatR;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using NAP.SLI.Authentication.Commands;
    using System.Threading.Tasks;

    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : Controller
    {
        private readonly IMediator mediator;

        public AccountController(IMediator mediator)
            => (this.mediator) = (mediator);

        [AllowAnonymous]
        [HttpPost("[action]")]
        public async Task<IActionResult> ChangePassword([FromBody]ChangePasswordRequest request) => await mediator.Send(request);

        [AllowAnonymous]
        [HttpPost("[action]")]
        public async Task<IActionResult> SetPassword([FromBody]SetPasswordRequest request) => await mediator.Send(request);
    }
}
