using MediatR;
using NAP.SLI.Common.Models;

namespace NAP.SLI.UserManagement.Requests
{
    public class ChangePasswordRequest : IRequest<ResultModel>
    {
        public int CustId { get; set; }

        public string Password { get; set; }
    }
}