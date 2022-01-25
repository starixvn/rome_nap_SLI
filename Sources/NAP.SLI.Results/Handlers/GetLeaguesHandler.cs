namespace NAP.SLI.Results.Handlers
{
    using System.Collections.Generic;
    using System.Threading;
    using System.Threading.Tasks;
    using MediatR;
    using NAP.SLI.Results.Models;
    using NAP.SLI.Results.Requests;
    using NAP.SLI.Results.Services;

    public class GetLeaguesHandler : IRequestHandler<GetLeaguesRequest, IEnumerable<LeagueModel>>
    {
        private readonly IResultService service;

        public GetLeaguesHandler(IResultService service)
        {
            this.service = service;
        }

        public async Task<IEnumerable<LeagueModel>> Handle(GetLeaguesRequest request, CancellationToken cancellationToken)
        {
            return await service.GetLeagues(request).ConfigureAwait(false);
        }
    }

}