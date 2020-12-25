namespace NAP.SimpleApi.Controllers
{
    using System.Linq;
    using System.Security.Claims;
    using System.Threading.Tasks;
    using Fanex.Data.Repository;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using NAP.SimpleApi.Helpers;
    using NAP.SimpleApi.Models;
    using NAP.SimpleApi.Requests;

    [ApiController]
    [Route("simple-api")]
    public class SimpleApiController : ControllerBase
    {
        private readonly IRequestOptionContext requestOptionContext;
        private readonly IDynamicRepository dynamicRepository;
        private readonly IAuthorizationService authorizationService;

        public SimpleApiController(IRequestOptionContext requestOptionContext, IDynamicRepository dynamicRepository, IAuthorizationService authorizationService)
        {
            this.requestOptionContext = requestOptionContext;
            this.dynamicRepository = dynamicRepository;
            this.authorizationService = authorizationService;
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> Get()
        {
            var requestOption = requestOptionContext.GetRequestOption(HttpContext.Request.Query, ActionTypes.Query);
            if (requestOption == null)
            {
                return BadRequest();
            }

            if (!await IsRequestAuthorized(requestOption).ConfigureAwait(false))
            {
                return StatusCode(StatusCodes.Status403Forbidden);
            }

            var criteria = requestOptionContext.CreateCriteria(HttpContext.Request.Query, requestOption);
            var data = await dynamicRepository.GetAsync<object>(criteria).ConfigureAwait(false);
            return Ok(data);
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> Query([FromBody] SimpleApiRequest request)
        {
            var requestOption = requestOptionContext.GetRequestOption(request, ActionTypes.Query);
            if (requestOption == null)
            {
                return BadRequest();
            }

            if (!await IsRequestAuthorized(requestOption).ConfigureAwait(false))
            {
                return StatusCode(StatusCodes.Status403Forbidden);
            }

            var criteria = requestOptionContext.CreateCriteria(request, requestOption);
            var data = await dynamicRepository.FetchMultipleAsync(criteria).ConfigureAwait(false);
            if (data.Count() == 1)
            {
                return Ok(data.First());
            }
            else
            {
                return Ok(data);
            }
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> Command([FromBody] SimpleApiRequest request)
        {
            var requestOption = requestOptionContext.GetRequestOption(request, ActionTypes.Command);
            if (requestOption == null)
            {
                return BadRequest();
            }

            if (!await IsRequestAuthorized(requestOption).ConfigureAwait(false))
            {
                return StatusCode(StatusCodes.Status403Forbidden);
            }

            var criteria = requestOptionContext.CreateCriteria(request, requestOption);
            await dynamicRepository.ExecuteAsync((INonQueryCommand)criteria).ConfigureAwait(false);
            return Ok(criteria);
        }

        private async Task<bool> IsRequestAuthorized(RequestOption requestOption)
        {
            if (requestOption.Policy != null)
            {
                var result = await authorizationService.AuthorizeAsync(HttpContext.User, null, requestOption.Policy).ConfigureAwait(false);
                return result.Succeeded;
            }

            return true;
        }
    }
}
