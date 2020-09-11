namespace NAP.SLI.Account.Handlers
{
    using MediatR;
    using NAP.SLI.Account.Models;
    using NAP.SLI.Account.Requests;
    using NAP.SLI.Account.Services;
    using System.Threading;
    using System.Threading.Tasks;

    public class RefreshHandler : IRequestHandler<RefreshRequest, AuthenticationModel>
    {
        private readonly ITokenService tokenService;

        public RefreshHandler(
            ITokenService tokenService
            )
            => (this.tokenService) = (tokenService);

        public Task<AuthenticationModel> Handle(RefreshRequest request, CancellationToken cancellationToken)
        {
            return Task.FromResult(tokenService.Refresh(request.Token));
        }
    }
}
