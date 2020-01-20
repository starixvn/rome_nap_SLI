namespace NAP.SimpleApi.Controllers
{
    using Fanex.Data.Repository;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using NAP.SimpleApi.Models;
    using System;
    using System.Linq;
    using System.Threading.Tasks;

    [Authorize]
    [ApiController]
    [Route("simple-api")]
    public class SimpleApiController : Controller
    {
        private readonly Configuration configuration;
        private readonly IDynamicRepository dynamicRepository;

        public SimpleApiController(Configuration configuration, IDynamicRepository dynamicRepository)
            => (this.configuration, this.dynamicRepository) = (configuration, dynamicRepository);

        [HttpPost("[action]")]
        public async Task<JsonResult> Query([FromBody]SimpleApiRequest request)
        {
            var criteria = ValidateAndCreateCriteria(request, ActionTypes.Query);
            var data = await dynamicRepository.FetchAsync<object>(criteria);
            return new JsonResult(data);
        }

        [HttpPost("[action]")]
        public async Task<JsonResult> Command([FromBody]SimpleApiRequest request)
        {
            var criteria = ValidateAndCreateCriteria(request, ActionTypes.Command);
            await dynamicRepository.ExecuteAsync((NonQueryCommand)criteria);
            return new JsonResult(criteria);
        }

        private ICriteria ValidateAndCreateCriteria(SimpleApiRequest request, ActionTypes actionType)
        {
            var requestOption = configuration.RequestOptions.FirstOrDefault(x => x.ApiKey == request.ApiKey && x.ActionType == actionType);
            if(requestOption == null)
            {
                throw new InvalidOperationException("ApiKey not found");
            }

            configuration.RequestActivator.AuthorizeRequest(HttpContext, requestOption);
            var criteria = configuration.RequestActivator.CreateCriteria(HttpContext, requestOption, request.Data);
            if (!criteria.IsValid())
            {
                throw new InvalidOperationException("Invalid criteria");
            }

            return criteria;
        }
    }
}
