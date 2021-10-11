namespace NAP.SLI.BetList.Handlers
{
    using MediatR;
    using NAP.SLI.BetList.Requests;
    using NAP.SLI.BetList.Services;
    using System.Threading;
    using System.Threading.Tasks;

    public class QueryByMatchHandler : IRequestHandler<QueryByMatchRequest, object>
    {
        private readonly IQueryService service;

        public QueryByMatchHandler(IQueryService service)
        {
            this.service = service;
        }

        public async Task<object> Handle(QueryByMatchRequest request, CancellationToken cancellationToken)
        {
            return await service.QueryByMatch(request).ConfigureAwait(false);
        }
    }
}
