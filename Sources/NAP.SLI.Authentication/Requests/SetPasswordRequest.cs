namespace NAP.SLI.Authentication.Requests
{
    using MediatR;
    using Microsoft.AspNetCore.Mvc;
    using System.ComponentModel.DataAnnotations;

    public class SetPasswordRequest : IRequest<IActionResult>
    {
        [Required]
        public int UserId { get; set; }

        [Required]
        [StringLength(50, MinimumLength = 1)]
        public string Password { get; set; }
    }
}
