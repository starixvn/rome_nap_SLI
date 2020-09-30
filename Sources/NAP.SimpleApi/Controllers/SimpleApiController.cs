namespace NAP.SimpleApi.Controllers
{
    using Fanex.Data.Repository;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using NAP.SimpleApi.Models;
    using NAP.SimpleApi.Requests;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    [Authorize]
    [ApiController]
    [Route("simple-api")]
    public class SimpleApiController : Controller
    {
        private readonly IRequestOptionContext requestOptionContext;
        private readonly IDynamicRepository dynamicRepository;

        public SimpleApiController(IRequestOptionContext requestOptionContext, IDynamicRepository dynamicRepository)
            => (this.requestOptionContext, this.dynamicRepository) = (requestOptionContext, dynamicRepository);

        [HttpGet("[action]")]
        public async Task<IActionResult> Get()
        {
            var criteria = requestOptionContext.CreateCriteria(HttpContext.Request.Query, ActionTypes.Query);
            var data = await dynamicRepository.GetAsync<object>(criteria);
            return Ok(data);
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> Query([FromBody] SimpleApiRequest request)
        {
            var criteria = requestOptionContext.CreateCriteria(request, ActionTypes.Query);
            var data = await dynamicRepository.FetchAsync<object>(criteria);
            return Ok(data);
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> QueryMultiple([FromBody] SimpleApiRequest request)
        {
            var criteria = requestOptionContext.CreateCriteria(request, ActionTypes.Query);
            var data = await dynamicRepository.FetchMultipleAsync<object, object, object>(criteria);
            return Ok(data);
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> Command([FromBody] SimpleApiRequest request)
        {
            var criteria = requestOptionContext.CreateCriteria(request, ActionTypes.Command);
            await dynamicRepository.ExecuteAsync((INonQueryCommand)criteria);
            return Ok(criteria);
        }
    }
}
