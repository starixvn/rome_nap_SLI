using System.ComponentModel.DataAnnotations;
using MediatR;
using NAP.SLI.Common.Models;

namespace NAP.SLI.UserManagement.Requests
{
    public class UpdateInfoRequest : IRequest<ResultModel>
    {
        [Required]
        public int CustId { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }
    }
}