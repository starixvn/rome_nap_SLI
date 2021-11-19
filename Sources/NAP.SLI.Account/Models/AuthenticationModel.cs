namespace NAP.SLI.Account.Models
{
    using NAP.SLI.Common.Models;

    public class AuthenticationModel : ResultModel
    {
        public string Username { get; set; }

        public int UserId { get; set; }

        public bool IsAdmin { get; set; }

        public string Token { get; set; }
    }
}
