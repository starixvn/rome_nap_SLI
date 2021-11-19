namespace NAP.SLI.UserManagement.Controllers
{
    using System.Threading.Tasks;
    using MediatR;
    using Microsoft.AspNetCore.Mvc;
    using NAP.SLI.UserManagement.Requests;

    [ApiController]
    [Route("api/user-management")]
    public class UserManagementController : ControllerBase
    {
        private readonly IMediator mediator;

        public UserManagementController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> Query([FromBody] QueryRequest request)
        {
            var result = await mediator.Send(request).ConfigureAwait(false);
            return Ok(result);
        }

        [HttpPost("update-info")]
        public async Task<IActionResult> UpdateInfo([FromBody] UpdateInfoRequest request)
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
