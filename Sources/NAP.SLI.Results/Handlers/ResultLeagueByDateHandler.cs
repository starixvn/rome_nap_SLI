namespace NAP.SLI.Results.Handlers
{
    using System.Collections.Generic;
    using System.Threading;
    using System.Threading.Tasks;
    using MediatR;
    using NAP.SLI.Results.Models;
    using NAP.SLI.Results.Requests;
    using NAP.SLI.Results.Services;

    public class ResultLeagueByDateHandler : IRequestHandler<ResultLeagueByDateRequest, IEnumerable<ResultLeagueByDateModel>>
    {
        private readonly IResultService service;

        public ResultLeagueByDateHandler(IResultService service)
        {
            this.service = service;
        }

        public async Task<IEnumerable<ResultLeagueByDateModel>> Handle(ResultLeagueByDateRequest request, CancellationToken cancellationToken)
        {
            return await service.GetResultLeagueByDate(request).ConfigureAwait(false);
        }
    }

}