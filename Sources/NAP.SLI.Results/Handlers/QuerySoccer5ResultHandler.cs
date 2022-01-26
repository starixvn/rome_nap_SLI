namespace NAP.SLI.Results.Handlers
{
    using System.Threading;
    using System.Threading.Tasks;
    using MediatR;
    using NAP.SLI.Results.Requests;
    using NAP.SLI.Results.Services;

    public class QuerySoccer5ResultHandler : IRequestHandler<QuerySoccer5ResultRequest, string>
    {
        private readonly IThirdPartyResultService service;

        public QuerySoccer5ResultHandler(IThirdPartyResultService service)
        {
            this.service = service;
        }

        public async Task<string> Handle(QuerySoccer5ResultRequest request, CancellationToken cancellationToken)
        {
            return await Task.FromResult(service.QuerySoccer5Result(request));
        }
    }
}