namespace NAP.SLI.Account.Controllers
{
    using MediatR;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using NAP.SLI.Account.Models;
    using NAP.SLI.Account.Requests;
    using NAP.SLI.Common.Models;
    using System.Net.Mime;
    using System.Threading.Tasks;

    [Consumes(MediaTypeNames.Application.Json)]
    [Produces(MediaTypeNames.Application.Json)]
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly IMediator mediator;

        public AccountController(IMediator mediator)
            => this.mediator = mediator;

        /// <summary>Login</summary>
        /// <response code="200">If login successfully, "isSuccess" = true. Otherwise, "isSuccess" = false</response>
        [AllowAnonymous]
        [HttpPost("[action]")]
        [ProducesResponseType(typeof(AuthenticationModel), StatusCodes.Status200OK)]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var result = await mediator.Send(request).ConfigureAwait(false);
            return Ok(result);
        }

        /// <summary>Refresh Token</summary>
        [HttpPost("[action]")]
        [ProducesResponseType(typeof(AuthenticationModel), StatusCodes.Status200OK)]
        public async Task<IActionResult> Refresh([FromBody] RefreshRequest request)
        {
            var result = await mediator.Send(request).ConfigureAwait(false);
            return Ok(result);
        }

        /// <summary>Checkin</summary>
        [HttpPost("[action]")]
        [ProducesResponseType(typeof(ResultModel), StatusCodes.Status200OK)]
        public async Task<IActionResult> CheckIn([FromBody] CheckInRequest request)
        {
            var result = await mediator.Send(request).ConfigureAwait(false);
            return Ok(result);
        }

        /// <summary>Logout</summary>
        [HttpPost("[action]")]
        public async Task<IActionResult> Logout([FromBody] LogoutRequest request)
        {
            var result = await mediator.Send(request).ConfigureAwait(false);
            return Ok(result);
        }

        /// <summary>Change Password</summary>
        [HttpPost("change-password")]
        [ProducesResponseType(typeof(ResultModel), StatusCodes.Status200OK)]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordRequest request)
        {
            var result = await mediator.Send(request).ConfigureAwait(false);
            return Ok(result);
        }
    }
}
