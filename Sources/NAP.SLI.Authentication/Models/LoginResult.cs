namespace NAP.SLI.Authentication.Models
{
    using NAP.SLI.Common.Models;

    public class LoginResult : NonQueryResult
    {
        public int UserId { get; set; }

        public int GroupId { get; set; }

        public string Token { get; set; }
    }
}
