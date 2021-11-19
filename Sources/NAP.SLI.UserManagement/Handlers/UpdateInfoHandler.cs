using System.Threading;
using System.Threading.Tasks;
using Fanex.NAP.Client.Configuration;
using Fanex.NAP.Client.Models.ParameterObject;
using Fanex.NAP.Client.Services;
using MediatR;
using NAP.SLI.Common.Models;
using NAP.SLI.UserManagement.Requests;

namespace NAP.SLI.UserManagement.Handlers
{
    public class UpdateInfoHandler : IRequestHandler<UpdateInfoRequest, ResultModel>
    {
        private readonly ISecurityService securityService;
        private readonly IUserService userService;
        private readonly INapSettings napSettings;

        public UpdateInfoHandler(ISecurityService securityService, IUserService userService, INapSettings napSettings)
        {
            this.securityService = securityService;
            this.userService = userService;
            this.napSettings = napSettings;
        }

        public async Task<ResultModel> Handle(UpdateInfoRequest request, CancellationToken cancellationToken)
        {
            var user = await userService.GetAsync(request.CustId).ConfigureAwait(false);
            if (user == null)
            {
                return new ResultModel
                {
                    ErrCode = ErrorCodes.GenericError,
                    ErrMsg = "User not found"
                };
            }

            var updateUserParameter = new UpdateUserInfoParameter
            {
                CustId = request.CustId,
                Username = user.Username,
                GroupId = (int)user.Group?.Id,
                FirstName = request.FirstName,
                LastName = request.LastName,
                Email = request.Email
            };
            var isSuccess = await securityService.UpdateProfileAsync(napSettings.SiteId, updateUserParameter).ConfigureAwait(false);
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