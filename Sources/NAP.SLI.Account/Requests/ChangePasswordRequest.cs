using System.ComponentModel.DataAnnotations;
using MediatR;
using NAP.SLI.Common.Models;

namespace NAP.SLI.Account.Requests
{
    public class ChangePasswordRequest : IRequest<ResultModel>
    {
        [Required]
        public string OldPassword { get; set; }

        [Required]
        public string NewPassword { get; set; }
    }
}