namespace NAP.SimpleApi.Controllers
{
    using System;
    using System.Linq;
    using System.Net.Mime;
    using System.Security.Claims;
    using System.Threading.Tasks;
    using Fanex.Data.Repository;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using NAP.SimpleApi.Helpers;
    using NAP.SimpleApi.Models;
    using NAP.SimpleApi.Requests;

    [Consumes(MediaTypeNames.Application.Json)]
    [Produces(MediaTypeNames.Application.Json)]
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

        /// <summary>Query</summary>
        [HttpPost("[action]")]
        public async Task<IActionResult> Query([FromBody] SimpleApiRequest request)
        {
            return await Handle(request, ActionTypes.Query).ConfigureAwait(false);
        }

        /// <summary>Command</summary>
        [HttpPost("[action]")]
        public async Task<IActionResult> Command([FromBody] SimpleApiRequest request)
        {
            return await Handle(request, ActionTypes.Command).ConfigureAwait(false);
        }

        private async Task<IActionResult> Handle(SimpleApiRequest request, ActionTypes actionType)
        {
            var requestOption = requestOptionContext.GetRequestOption(request, actionType);
            if (requestOption == null)
            {
                return BadRequest();
            }

            if (requestOption.Extra != null && requestOption.Extra.Policy != null)
            {
                var result = await authorizationService.AuthorizeAsync(HttpContext.User, null, requestOption.Extra.Policy).ConfigureAwait(false);
                if (!result.Succeeded)
                {
                    return StatusCode(StatusCodes.Status403Forbidden);
                }
            }

            var criteria = requestOptionContext.CreateCriteria(request, requestOption);
            if (actionType == ActionTypes.Query)
            {
                var data = await dynamicRepository.FetchMultipleAsync(criteria).ConfigureAwait(false);
                var queryStrategy = requestOption.Extra != null ? requestOption.Extra.QueryStrategy : QueryStrategies.SingleAndMultiple;
                var queryData = queryStrategy switch
                {
                    QueryStrategies.SingleAndSingle => data.First().First(),
                    QueryStrategies.SingleAndMultiple => data.First(),
                    QueryStrategies.MultipleAndMultiple => data,
                    _ => throw new ArgumentException(nameof(queryStrategy))
                };
                return Ok(queryData);
            }
            else
            {
                await dynamicRepository.ExecuteAsync((INonQueryCommand)criteria).ConfigureAwait(false);
                return Ok(criteria);
            }
        }
    }
}
