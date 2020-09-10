namespace NAP.SLI.Account.Requests
{
    using MediatR;
    using NAP.SLI.Account.Models;
    using System.ComponentModel.DataAnnotations;

    public class LoginRequest : IRequest<LoginResult>
    {
        [Required]
        [StringLength(50, MinimumLength = 1)]
        public string Username { get; set; }

        [Required]
        [StringLength(50, MinimumLength = 1)]
        public string Password { get; set; }
    }
}
