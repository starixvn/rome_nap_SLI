
namespace NAP.SLI.BetList.Handlers
{
    using System.Threading;
    using System.Threading.Tasks;
    using MediatR;
    using NAP.SLI.BetList.Requests;
    using NAP.SLI.BetList.Services;

    public class QueryByBettypeHandler : IRequestHandler<QueryByBettypeRequest, object>
    {
        private readonly IQueryService service;

        public QueryByBettypeHandler(IQueryService service)
        {
            this.service = service;
        }

        public async Task<object> Handle(QueryByBettypeRequest request, CancellationToken cancellationToken)
        {
            return await service.QueryByBettype(request).ConfigureAwait(false);
        }
    }
}