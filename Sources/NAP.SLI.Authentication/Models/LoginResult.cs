namespace NAP.SLI.Authentication.Models
{
    using NAP.SLI.Common.Models;

    public class LoginResult : NonQueryResult
    {
        public int CustId { get; set; }

        public int RoleId { get; set; }
    }
}
