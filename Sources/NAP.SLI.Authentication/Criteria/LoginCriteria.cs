namespace NAP.SLI.Authentication.Criteria
{
    using Fanex.Data;
    using Fanex.Data.Repository;

    public class LoginCriteria: NonQueryCommand
    {
        public string Username { get; set; }

        [SpParam(SqlParamName = "UserPwd")]
        public string Password { get; set; }

        public string LoginIP { get; set; }

        public string LoginDomain { get; set; }

        public string BrowserName { get; set; }

        public string Platform { get; set; }

        public string CountryCode { get; set; }

        public string From { get; set; } = string.Empty;

        public int CustId { get; set; }

        public int RoleId { get; set; }

        public int ErrCode { get; set; }

        public string ErrMessage { get; set; }

        public override string GetSettingKey() => "SLI_UserLogin";

        public override bool IsValid() => !string.IsNullOrWhiteSpace(Username)
            && !string.IsNullOrWhiteSpace(Password)
            && !string.IsNullOrWhiteSpace(LoginIP);
    }
}
