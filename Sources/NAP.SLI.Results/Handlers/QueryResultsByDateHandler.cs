namespace NAP.SLI.Results.Handlers
{
    using System;
    using System.Threading;
    using System.Threading.Tasks;
    using MediatR;
    using NAP.SLI.Common.Models;
    using NAP.SLI.Results.Requests;
    using NAP.SLI.Results.Services;

    public class QueryResultsByDateHandler : IRequestHandler<QueryResultsByDateRequest, object>
    {
        private readonly IResultService service;

        public QueryResultsByDateHandler(IResultService service)
        {
            this.service = service;
        }

        public async Task<object> Handle(QueryResultsByDateRequest request, CancellationToken cancellationToken)
        {
            return request.SportType switch
            {
                (int)SportTypes.NumberGame => await service.QueryNumberGameResultsByDate(request).ConfigureAwait(false),
                (int)SportTypes.Happy5 => await service.QueryHappy5ResultsByDate(request).ConfigureAwait(false),
                _ => throw new NotImplementedException()
            };
        }
    }
}