namespace NAP.SLI.Account.Requests
{
    using System.ComponentModel.DataAnnotations;
    using MediatR;
    using NAP.SLI.Account.Models;

    public class RefreshRequest : IRequest<AuthenticationModel>
    {
        [Required]
        public string Token { get; set; }
    }
}
