namespace NAP.SLI.SimpleApi.Core
{
    using AutoMapper;
    using Fanex.Data.Repository;
    using MediatR;
    using Microsoft.AspNetCore.Mvc;
    using NAP.SLI.Common.Extensions;
    using NAP.SLI.Common.Models;
    using System.Threading;
    using System.Threading.Tasks;

    public class RequestHandler : IRequestHandler<RequestOption, IActionResult>
    {
        private readonly IDynamicRepository dynamicRepository;
        private readonly IMapper mapper;

        public RequestHandler(IDynamicRepository dynamicRepository, IMapper mapper)
            => (this.dynamicRepository, this.mapper) = (dynamicRepository, mapper);

        public async Task<IActionResult> Handle(RequestOption request, CancellationToken cancellationToken)
        {
            var configuration = Configuration.Instance;
            var criteria = configuration.CriteriaActivator.CreateInstance(request);
            criteria.ThrowExceptionIsInvalid();
            if (request.ActionType == ActionTypes.Query)
            {
                var data = await dynamicRepository.FetchAsync<object>(criteria);
                return new JsonResult(data);
            }
            else
            {
                await dynamicRepository.ExecuteAsync((NonQueryCommand)criteria);
                if (!(criteria is NonQueryResult result))
                {
                    result = new NonQueryResult();
                }

                return new JsonResult(result);
            }
        }
    }
}
