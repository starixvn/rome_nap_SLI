namespace NAP.SLI.UserManagement.Commands
{
    using Fanex.Data.Repository;

    public class ChangeUserPasswordCommand : NonQueryCommand
    {
        public int CustId { get; set; }
        
        public string UserPwd { get; set; }

        public int UserId { get; set; }

        public bool IsForceChangePwd { get; set; }

        public bool IsABS { get; set; }

        public string Language { get; set; }

        public string LoginIp { get; set; }

        public override string GetSettingKey()
            => "Acc_CustomerUpdPwdReset";

        public override bool IsValid()
            => CustId > 0 && !string.IsNullOrEmpty(UserPwd);
    }
}