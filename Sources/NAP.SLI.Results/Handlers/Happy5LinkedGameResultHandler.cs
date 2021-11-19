namespace NAP.SLI.Results.Handlers
{
    using System.Threading;
    using System.Threading.Tasks;
    using MediatR;
    using NAP.SLI.Results.Requests;
    using NAP.SLI.Results.Services;

    public class Happy5LinkedGameResultHandler : IRequestHandler<Happy5LinkedGameResultRequest, string>
    {
        private readonly IThirdPartyResultService service;

        public Happy5LinkedGameResultHandler(IThirdPartyResultService service)
        {
            this.service = service;
        }

        public async Task<string> Handle(Happy5LinkedGameResultRequest request, CancellationToken cancellationToken)
        {
            return await service.GetHappy5LinkedGameResult(request).ConfigureAwait(false);
        }
    }
}