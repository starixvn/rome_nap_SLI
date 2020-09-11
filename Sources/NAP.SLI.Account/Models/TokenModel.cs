namespace NAP.SLI.Account.Models
{
    public class TokenModel
    {
        public string Username { get; private set; }

        public int UserId { get; private set; }

        public int GroupId { get; private set; }

        public TokenModel(string username, int userId, int groupId)
        {
            Username = username;
            UserId = userId;
            GroupId = groupId;
        }
    }
}
