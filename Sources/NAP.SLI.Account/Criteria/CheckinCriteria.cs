namespace NAP.SLI.Account.Criteria
{
    using Fanex.Data;
    using Fanex.Data.Repository;
    using NAP.SLI.Common.Criteria;
    using NAP.SLI.Common.Services;

    public class CheckinCriteria : ResultCriteriaBase, INonQueryCommand
    {
        private readonly ICurrentUserService currentUserService;

        public CheckinCriteria(ICurrentUserService currentUserService)
        => (this.currentUserService) = (currentUserService);

        public int UserId{get;set;}

        public int CustId => currentUserService.UserId;

        [SpParam(SqlParamName = "OldUserPwd")]
        public string OldPassword { get; set; }

        [SpParam(SqlParamName = "UserPwd")]
        public string NewPassword { get; set; }

        public override string GetSettingKey() => "SLI_User_Upd";

        public override bool IsValid() => UserId > 0 && CustId > 0
            && !string.IsNullOrWhiteSpace(OldPassword)
            && !string.IsNullOrWhiteSpace(NewPassword);
    }
}
