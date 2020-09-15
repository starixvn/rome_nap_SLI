namespace NAP.SLI.UserManagement.Commands
{
    using Fanex.Data.Repository;
    using NAP.SLI.Common.Services;

    public class AddNewUserCommnad : NonQueryCommand
    {
        private readonly ICurrentUserService currentUserService;

        public AddNewUserCommnad(ICurrentUserService currentUserService)
        {
            this.currentUserService = currentUserService;
        }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string UserName { get; set; }

        public string UserPwd { get; set; }

        public int UserId => currentUserService.UserId;

        public int? GroupId { get; set; }

        public bool IsAddNew { get; set; }

        public int ErrCode { get; set; }

        public string ErrMsg { get; set; }
        public override string GetSettingKey()
            => "SLI_User_Ins";

        public override bool IsValid()
         => !string.IsNullOrEmpty(UserName) && UserId > 0;
    }
}