namespace NAP.SLI.Account.Models
{
    public class TokenModel
    {
        public string Username { get; private set; }

        public int OnUserId { get; private set; }

        public int UserId { get; private set; }

        public bool IsAdmin { get; private set; }

        public TokenModel(int onUserId, string username, int userId, bool isAdmin)
        {
            OnUserId = onUserId;
            Username = username;
            UserId = userId;
            IsAdmin = isAdmin;
        }
    }
}
