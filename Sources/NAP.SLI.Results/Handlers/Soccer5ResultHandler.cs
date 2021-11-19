namespace NAP.SLI.Results.Handlers
{
    using System.Threading;
    using System.Threading.Tasks;
    using MediatR;
    using NAP.SLI.Results.Requests;
    using NAP.SLI.Results.Services;

    public class Soccer5ResultHandler : IRequestHandler<Soccer5ResultRequest, string>
    {
        private readonly IThirdPartyResultService service;

        public Soccer5ResultHandler(IThirdPartyResultService service)
        {
            this.service = service;
        }

        public async Task<string> Handle(Soccer5ResultRequest request, CancellationToken cancellationToken)
        {
            return await Task.FromResult(service.GetSoccer5Result(request));
        }
    }
}