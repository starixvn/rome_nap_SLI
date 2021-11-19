using System.Threading;
using System.Threading.Tasks;
using Fanex.NAP.Client.Services;
using MediatR;
using NAP.SLI.Account.Requests;
using NAP.SLI.Common.Services;

namespace NAP.SLI.Account.Handlers
{
    public class LogoutHandler : IRequestHandler<LogoutRequest, Unit>
    {
        private readonly ISecurityService securityService;
        private readonly ICurrentUserService currentUserService;

        public LogoutHandler(
            ISecurityService securityService,
            ICurrentUserService currentUserService)
        {
            this.securityService = securityService;
            this.currentUserService = currentUserService;
        }

        public async Task<Unit> Handle(LogoutRequest request, CancellationToken cancellationToken)
        {
            await securityService.LogoutAsync(currentUserService.OnUserId).ConfigureAwait(false);
            return Unit.Value;
        }
    }
}