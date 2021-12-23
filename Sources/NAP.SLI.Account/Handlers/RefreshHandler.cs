namespace NAP.SLI.Account.Handlers
{
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
        private readonly ICurrentUserService currentUserService;
        private readonly ITokenManager tokenManager;

        public RefreshHandler(
            ICurrentUserService currentUserService,
            ITokenManager tokenManager)
        {
            this.currentUserService = currentUserService;
            this.tokenManager = tokenManager;
        }

        public Task<AuthenticationModel> Handle(RefreshRequest request, CancellationToken cancellationToken)
        {
            var tokenModel = new TokenModel(currentUserService.OnUserId, currentUserService.Username, currentUserService.UserId, currentUserService.IsAdmin);
            var token = tokenManager.Generate(tokenModel);
            var model = new AuthenticationModel
            {
                ErrCode = ErrorCodes.OK,
                Token = token,
                UserId = tokenModel.UserId,
                IsAdmin = tokenModel.IsAdmin
            };
            return Task.FromResult(model);
        }
    }
}