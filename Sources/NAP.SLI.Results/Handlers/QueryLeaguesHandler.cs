namespace NAP.SLI.Results.Handlers
{
    using System.Collections.Generic;
    using System.Threading;
    using System.Threading.Tasks;
    using MediatR;
    using NAP.SLI.Results.Models;
    using NAP.SLI.Results.Requests;
    using NAP.SLI.Results.Services;

    public class QueryLeaguesHandler : IRequestHandler<QueryLeaguesRequest, IEnumerable<LeagueModel>>
    {
        private readonly IResultService service;

        public QueryLeaguesHandler(IResultService service)
        {
            this.service = service;
        }

        public async Task<IEnumerable<LeagueModel>> Handle(QueryLeaguesRequest request, CancellationToken cancellationToken)
        {
            return await service.QueryLeagues(request).ConfigureAwait(false);
        }
    }

}