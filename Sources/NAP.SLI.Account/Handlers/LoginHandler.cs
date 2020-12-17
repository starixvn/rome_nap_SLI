namespace NAP.SLI.Account.Handlers
{
    using MediatR;
    using NAP.SLI.Account.Models;
    using NAP.SLI.Account.Requests;
    using NAP.SLI.Account.Services;
    using System.Threading;
    using System.Threading.Tasks;

    public class LoginHandler : IRequestHandler<LoginRequest, AuthenticationModel>
    {
        private readonly IAuthenticationService authenticationService;

        public LoginHandler(IAuthenticationService authenticationService)
        {
            this.authenticationService = authenticationService;
        }

        public async Task<AuthenticationModel> Handle(LoginRequest request, CancellationToken cancellationToken)
        {
            return await authenticationService.Login(request).ConfigureAwait(false);
        }
    }
}
