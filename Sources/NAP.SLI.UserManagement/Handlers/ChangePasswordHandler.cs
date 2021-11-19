using System.Threading;
using System.Threading.Tasks;
using Fanex.NAP.Client.Configuration;
using Fanex.NAP.Client.Services;
using MediatR;
using NAP.SLI.Common.Models;
using NAP.SLI.UserManagement.Requests;

namespace NAP.SLI.UserManagement.Handlers
{
    public class ChangePasswordHandler : IRequestHandler<ChangePasswordRequest, ResultModel>
    {
        private readonly ISecurityService securityService;
        private readonly INapSettings napSettings;

        public ChangePasswordHandler(ISecurityService securityService, INapSettings napSettings)
        {
            this.securityService = securityService;
            this.napSettings = napSettings;
        }

        public async Task<ResultModel> Handle(ChangePasswordRequest request, CancellationToken cancellationToken)
        {
            var isSuccess = await securityService.UpdatePasswordAsync(napSettings.SiteId, request.CustId, request.Password);
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