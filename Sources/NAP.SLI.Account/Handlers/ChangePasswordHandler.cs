namespace NAP.SLI.Account.Handlers
{
    using Fanex.NAP.Client.Configuration;
    using Fanex.NAP.Client.Services;
    using MediatR;
    using NAP.SLI.Account.Requests;
    using NAP.SLI.Common.Models;
    using NAP.SLI.Common.Services;
    using System.Threading;
    using System.Threading.Tasks;

    public class ChangePasswordHandler : IRequestHandler<ChangePasswordRequest, ResultModel>
    {
        private readonly ISecurityService securityService;
        private readonly IUserService userService;
        private readonly INapSettings napSettings;
        private readonly ICurrentUserService currentUserService;

        public ChangePasswordHandler(ISecurityService securityService, IUserService userService, INapSettings napSettings, ICurrentUserService currentUserService)
        {
            this.securityService = securityService;
            this.userService = userService;
            this.napSettings = napSettings;
            this.currentUserService = currentUserService;
        }

        public async Task<ResultModel> Handle(ChangePasswordRequest request, CancellationToken cancellationToken)
        {
            var user = await userService.GetAsync(currentUserService.UserId).ConfigureAwait(false);
            if (user == null || user.Password != request.OldPassword)
            {
                return new ResultModel
                {
                    ErrCode = ErrorCodes.GenericError,
                    ErrMsg = "Incorrect password"
                };
            }

            var isSuccess = await securityService.UpdatePasswordAsync(napSettings.SiteId, currentUserService.UserId, request.NewPassword).ConfigureAwait(false);
            if (isSuccess)
            {
                return ResultModel.Success;
            }
            else
            {
                return new ResultModel
                {
                    ErrCode = ErrorCodes.GenericError,
                    ErrMsg = "Update failed"
                };
            }
        }
    }
}