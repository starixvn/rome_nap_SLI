namespace NAP.SLI.UserManagement.Commands
{
    using Fanex.Data.Repository;

    public class UpdateUserStatusCommand : NonQueryCommand
    {
        public int CustId { get; set; }

        public bool Closed { get; set; }

        public string Language { get; set; }

        public int UserId { get; set; }

        public string System { get; set; }

        public override string GetSettingKey() => "AdminUpdClosed";

        public override bool IsValid() => CustId > 0;
    }
}