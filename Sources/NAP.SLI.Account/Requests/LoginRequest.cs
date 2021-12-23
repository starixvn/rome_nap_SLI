namespace NAP.SLI.Account.Requests
{
    using MediatR;
    using NAP.SLI.Account.Models;
    using System.ComponentModel.DataAnnotations;

    public class LoginRequest : IRequest<AuthenticationModel>
    {
        /// <example>starix1</example>
        [Required]
        [StringLength(50, MinimumLength = 1)]
        public string Username { get; set; }

        /// <example>56E8A2D78170E87C928E480797CC73</example>
        [Required]
        [StringLength(50, MinimumLength = 1)]
        public string Password { get; set; }
    }
}
