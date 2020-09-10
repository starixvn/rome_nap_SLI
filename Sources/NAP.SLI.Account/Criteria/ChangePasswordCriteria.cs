namespace NAP.SLI.Account.Criteria
{
    using Fanex.Data;
    using Fanex.Data.Repository;
    using NAP.SLI.Common.Models;
    using NAP.SLI.Common.Services;

    public class ChangePasswordCriteria : NonQueryResult, INonQueryCommand
    {
        private readonly ICurrentUserService currentUserService;

        public ChangePasswordCriteria(ICurrentUserService currentUserService)
        => (this.currentUserService) = (currentUserService);

        public int UserId => currentUserService.UserId;

        public int CustId => currentUserService.UserId;

        [SpParam(SqlParamName = "OldUserPwd")]
        public string OldPassword { get; set; }

        [SpParam(SqlParamName = "UserPwd")]
        public string NewPassword { get; set; }

        public string GetSettingKey() => "SLI_User_Upd";

        public bool IsValid() => UserId > 0 && CustId > 0
            && !string.IsNullOrWhiteSpace(OldPassword)
            && !string.IsNullOrWhiteSpace(NewPassword);
    }
}
