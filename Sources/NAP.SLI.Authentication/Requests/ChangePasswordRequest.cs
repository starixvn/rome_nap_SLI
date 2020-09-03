namespace NAP.SLI.Authentication.Requests
{
    using MediatR;
    using Microsoft.AspNetCore.Mvc;
    using System.ComponentModel.DataAnnotations;

    public class ChangePasswordRequest : IRequest<IActionResult>
    {
        [Required]
        public int CustId { get; set; }

        [Required]
        [StringLength(50, MinimumLength = 1)]
        public string OldPassword { get; set; }

        [Required]
        [StringLength(50, MinimumLength = 1)]
        public string NewPassword { get; set; }
    }
}
