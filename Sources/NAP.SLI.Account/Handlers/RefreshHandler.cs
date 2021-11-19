namespace NAP.SLI.Account.Handlers
{
    using Fanex.NAP.Client.Configuration;
    using Fanex.NAP.Client.Services;
    using MediatR;
    using NAP.SLI.Account.Models;
    using NAP.SLI.Account.Requests;
    using NAP.SLI.Account.Services;
    using NAP.SLI.Common.Models;
    using NAP.SLI.Common.Services;
    using System.Threading;
    using System.Threading.Tasks;

    public class RefreshHandler : IRequestHandler<RefreshRequest, AuthenticationModel>
    {
        private readonly ISecurityService securityService;
        private readonly ICurrentUserService currentUserService;
        private readonly INapSettings napSettings;
        private readonly ITokenManager tokenManager;

        public RefreshHandler(
            ISecurityService securityService,
            ICurrentUserService currentUserService,
            INapSettings napSettings,
            ITokenManager tokenManager)
        {
            this.securityService = securityService;
            this.currentUserService = currentUserService;
            this.napSettings = napSettings;
            this.tokenManager = tokenManager;
        }

        public async Task<AuthenticationModel> Handle(RefreshRequest request, CancellationToken cancellationToken)
        {
            var errCode = await securityService.ReCheckInAsync(currentUserService.OnUserId, napSettings.SiteId).ConfigureAwait(false);
            if (errCode != ErrorCodes.OK)
            {
                return new AuthenticationModel
                {
                    ErrCode = errCode
                };
            }

            var tokenModel = new TokenModel(currentUserService.OnUserId, currentUserService.Username, currentUserService.UserId, currentUserService.IsAdmin);
            var token = tokenManager.Generate(tokenModel);
            return new AuthenticationModel
            {
                ErrCode = errCode,
                Token = token,
                UserId = tokenModel.UserId,
                IsAdmin = tokenModel.IsAdmin
            };
        }
    }
}