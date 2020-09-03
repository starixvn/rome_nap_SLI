namespace NAP.SLI.Authentication.Requests
{
    using MediatR;
    using NAP.SLI.Authentication.Models;
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
