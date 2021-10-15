namespace NAP.SLI.BetList.Handlers
{
    using System.Threading;
    using System.Threading.Tasks;
    using MediatR;
    using NAP.SLI.BetList.Requests;
    using NAP.SLI.BetList.Services;

    public class QueryByDateHandler : IRequestHandler<QueryByDateRequest, object>
    {
        private readonly IQueryService service;

        public QueryByDateHandler(IQueryService service)
        {
            this.service = service;
        }

        public async Task<object> Handle(QueryByDateRequest request, CancellationToken cancellationToken)
        {
            return await service.QueryByDate(request).ConfigureAwait(false);
        }
    }
}