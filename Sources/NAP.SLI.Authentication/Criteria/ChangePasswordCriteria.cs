namespace NAP.SLI.Authentication.Criteria
{
    using Fanex.Data.Repository;
    using NAP.SLI.Common.Models;

    public class ChangePasswordCriteria : NonQueryResult, INonQueryCommand
    {
        public int UserId { get; set; }

        public int CustId { get; set; }

        public string OldPassword { get; set; }

        public string NewPassword { get; set; }

        public string GetSettingKey() => "SLI_User_Upd";

        public bool IsValid() => UserId > 0 && CustId > 0
            && !string.IsNullOrWhiteSpace(OldPassword)
            && !string.IsNullOrWhiteSpace(NewPassword);
    }
}
