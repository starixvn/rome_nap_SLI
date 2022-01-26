namespace NAP.SLI.Results.Handlers
{
    using System.Threading;
    using System.Threading.Tasks;
    using MediatR;
    using NAP.SLI.Results.Requests;
    using NAP.SLI.Results.Services;

    public class QueryHappy5LinkedGameResultHandler : IRequestHandler<QueryHappy5LinkedGameResultRequest, string>
    {
        private readonly IThirdPartyResultService service;

        public QueryHappy5LinkedGameResultHandler(IThirdPartyResultService service)
        {
            this.service = service;
        }

        public async Task<string> Handle(QueryHappy5LinkedGameResultRequest request, CancellationToken cancellationToken)
        {
            return await service.QueryHappy5LinkedGameResult(request).ConfigureAwait(false);
        }
    }
}