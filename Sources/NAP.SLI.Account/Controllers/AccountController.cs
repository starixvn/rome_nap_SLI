namespace NAP.SLI.Account.Controllers
{
    using MediatR;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using NAP.SLI.Account.Requests;
    using System.Threading.Tasks;

    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly IMediator mediator;

        public AccountController(IMediator mediator)
            => this.mediator = mediator;

        [AllowAnonymous]
        [HttpPost("[action]")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var result = await mediator.Send(request).ConfigureAwait(false);
            return Ok(result);
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> Refresh([FromBody] RefreshRequest request)
        {
            var result = await mediator.Send(request).ConfigureAwait(false);
            return Ok(result);
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> Logout([FromBody] LogoutRequest request)
        {
            var result = await mediator.Send(request).ConfigureAwait(false);
            return Ok(result);
        }

        [HttpPost("change-password")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordRequest request)
        {
            var result = await mediator.Send(request).ConfigureAwait(false);
            return Ok(result);
        }
    }
}
