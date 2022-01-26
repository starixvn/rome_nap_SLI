namespace NAP.SLI.Results.Handlers
{
    using System;
    using System.Threading;
    using System.Threading.Tasks;
    using MediatR;
    using NAP.SLI.Common.Models;
    using NAP.SLI.Results.Requests;
    using NAP.SLI.Results.Services;

    public class QueryResultsByMatchHandler : IRequestHandler<QueryResultsByMatchRequest, object>
    {
        private readonly IResultService service;

        public QueryResultsByMatchHandler(IResultService service)
        {
            this.service = service;
        }

        public async Task<object> Handle(QueryResultsByMatchRequest request, CancellationToken cancellationToken)
        {
            return request.SportType switch
            {
                (int)SportTypes.NumberGame => await service.QueryNumberGameResultsByMatch(request).ConfigureAwait(false),
                (int)SportTypes.Happy5 => await service.QueryHappy5ResultsByMatch(request).ConfigureAwait(false),
                _ => throw new NotImplementedException()
            };
        }
    }
}