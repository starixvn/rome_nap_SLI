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

    public class CheckInHandler : IRequestHandler<CheckInRequest, ResultModel>
    {
        private readonly ISecurityService securityService;
        private readonly ICurrentUserService currentUserService;
        private readonly INapSettings napSettings;

        public CheckInHandler(
            ISecurityService securityService,
            ICurrentUserService currentUserService,
            INapSettings napSettings)
        {
            this.securityService = securityService;
            this.currentUserService = currentUserService;
            this.napSettings = napSettings;
        }

        public async Task<ResultModel> Handle(CheckInRequest request, CancellationToken cancellationToken)
        {
            if (napSettings.EnableReCheckIn)
            {
                var errCode = await securityService.ReCheckInAsync(currentUserService.OnUserId, napSettings.SiteId).ConfigureAwait(false);
                if (errCode != ErrorCodes.OK)
                {
                    return new ResultModel
                    {
                        ErrCode = errCode
                    };
                }
            }

            return ResultModel.Success;
        }
    }
}