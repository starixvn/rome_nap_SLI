namespace NAP.SLI.Account.Handlers
{
    using Fanex.Data.Repository;
    using MediatR;
    using NAP.SLI.Account.Requests;
    using NAP.SLI.Account.Services;
    using NAP.SLI.Common.Models;
    using NAP.SLI.Common.Services;
    using System.Threading;
    using System.Threading.Tasks;

    public class ReCheckinHandler : IRequestHandler<ReCheckinRequest, ResultModel>
    {
        private readonly IAuthenticationService authenticationService;

        public ReCheckinHandler(IAuthenticationService authenticationService)
        {
            this.authenticationService = authenticationService;
        }

        public async Task<ResultModel> Handle(ReCheckinRequest request, CancellationToken cancellationToken)
        {
            return await authenticationService.ReCheckin(request).ConfigureAwait(false);
        }
    }
}