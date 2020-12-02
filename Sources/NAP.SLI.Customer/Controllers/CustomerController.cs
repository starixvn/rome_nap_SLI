namespace NAP.SLI.Customer.Controllers
{
    using System.Threading.Tasks;
    using MediatR;
    using Microsoft.AspNetCore.Mvc;
    using NAP.SLI.Customer.Requests;

    [ApiController]
    [Route("api/[controller]")]
    public class CustomerController : ControllerBase
    {
        private readonly IMediator mediator;

        public CustomerController(IMediator mediator)
            => (this.mediator) = (mediator);

        [HttpPost("[action]")]
        public async Task<IActionResult> Information([FromBody]GetInformationRequest request)
        {
            var result = await mediator.Send(request).ConfigureAwait(false);
            return Ok(result);
        }
    }
}
