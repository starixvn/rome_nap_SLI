using System.ComponentModel.DataAnnotations;
using MediatR;
using NAP.SLI.Common.Models;

namespace NAP.SLI.UserManagement.Requests
{
    public class ChangePasswordRequest : IRequest<ResultModel>
    {
        [Required]
        public int CustId { get; set; }

        [Required]
        public string Password { get; set; }
    }
}