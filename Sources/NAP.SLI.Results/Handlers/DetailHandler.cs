namespace NAP.SLI.Results.Handlers
{
    using System.Threading;
    using System.Threading.Tasks;
    using MediatR;
    using NAP.SLI.Results.Requests;
    using NAP.SLI.Results.Services;

    public class DetailHandler : IRequestHandler<DetailRequest, string>
    {
        private readonly IQueryService service;

        public DetailHandler(IQueryService service)
        {
            this.service = service;
        }

        public async Task<string> Handle(DetailRequest request, CancellationToken cancellationToken)
        {
            return await service.QueryDetail(request).ConfigureAwait(false);
        }
    }
}