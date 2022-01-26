namespace NAP.SLI.Results.Handlers
{
    using System.Collections.Generic;
    using System.Threading;
    using System.Threading.Tasks;
    using MediatR;
    using NAP.SLI.Results.Models;
    using NAP.SLI.Results.Requests;
    using NAP.SLI.Results.Services;

    public class QuerySportsHandler : IRequestHandler<QuerySportsRequest, IEnumerable<SportModel>>
    {
        private readonly IResultService service;

        public QuerySportsHandler(IResultService service)
        {
            this.service = service;
        }

        public async Task<IEnumerable<SportModel>> Handle(QuerySportsRequest request, CancellationToken cancellationToken)
        {
            return await service.GetSports(request).ConfigureAwait(false);
        }
    }

}