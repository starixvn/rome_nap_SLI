namespace NAP.SLI.Authentication.Models
{
    public class AuthenticationSettings
    {
        public string SecretKey { get; set; }

        public int AccessExpiration { get; set; }
    }
}
