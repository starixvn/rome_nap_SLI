namespace NAP.SLI.UserManagement.Controllers
{
    using System.Collections.Generic;
    using System.Net.Mime;
    using System.Threading.Tasks;
    using MediatR;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using NAP.SLI.Common.Models;
    using NAP.SLI.UserManagement.Models;
    using NAP.SLI.UserManagement.Requests;

    [Consumes(MediaTypeNames.Application.Json)]
    [Produces(MediaTypeNames.Application.Json)]
    [ApiController]
    [Route("api/user-management")]
    public class UserManagementController : ControllerBase
    {
        private readonly IMediator mediator;

        public UserManagementController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        /// <summary>Query</summary>
        [HttpPost("[action]")]
        [ProducesResponseType(typeof(IEnumerable<UserModel>), StatusCodes.Status200OK)]
        public async Task<IActionResult> Query([FromBody] QueryRequest request)
        {
            var result = await mediator.Send(request).ConfigureAwait(false);
            return Ok(result);
        }

        /// <summary>Update Info</summary>
        /// <response code="200">If request executes successfully, "isSuccess" = true. Otherwise, "isSuccess" = false</response>
        [HttpPost("update-info")]
        [ProducesResponseType(typeof(ResultModel), StatusCodes.Status200OK)]
        public async Task<IActionResult> UpdateInfo([FromBody] UpdateInfoRequest request)
        {
            var result = await mediator.Send(request).ConfigureAwait(false);
            return Ok(result);
        }

        /// <summary>Change Password</summary>
        /// <response code="200">If request executes successfully, "isSuccess" = true. Otherwise, "isSuccess" = false</response>
        [HttpPost("change-password")]
        [ProducesResponseType(typeof(ResultModel), StatusCodes.Status200OK)]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordRequest request)
        {
            var result = await mediator.Send(request).ConfigureAwait(false);
            return Ok(result);
        }
    }
}
