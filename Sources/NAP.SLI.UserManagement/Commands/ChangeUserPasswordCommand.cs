namespace NAP.SLI.UserManagement.Commands
{
    using Fanex.Data.Repository;
    using NAP.SLI.Common.Criteria;
    using NAP.SLI.Common.Services;

    public class ChangeUserPasswordCommand : ResultCriteriaBase, INonQueryCommand
    {
        private readonly ICurrentUserService currentUserService;

        public ChangeUserPasswordCommand(ICurrentUserService currentUserService)
        {
            this.currentUserService = currentUserService;
        }

        public int CustId { get; set; }
        
        public string UserPwd { get; set; }

        public int UserId => currentUserService.UserId;

        public bool IsForcedChangePwd { get; set; }

        public bool IsABS { get; set; }

        public string Language { get; set; }

        public string LoginIp { get; set; }
        
        public override string GetSettingKey()
            => "Acc_CustomerUpdPwdReset";

        public override bool IsValid()
            => CustId > 0 && !string.IsNullOrEmpty(UserPwd);
    }
}