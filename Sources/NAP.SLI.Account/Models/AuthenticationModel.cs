namespace NAP.SLI.Account.Models
{
    using NAP.SLI.Common.Models;

    public class AuthenticationModel : ResultModel
    {
        public int UserId { get; set; }

        public int GroupId { get; set; }

        public string Token { get; set; }

        public string ConnectionId { get; set; }
    }
}
