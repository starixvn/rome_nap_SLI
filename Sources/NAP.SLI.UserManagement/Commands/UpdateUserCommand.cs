namespace NAP.SLI.UserManagement.Commands
{
    using Fanex.Data.Repository;
    using NAP.SLI.Common.Services;

    public class UpdateUserCommand : NonQueryCommand
    {
        private readonly ICurrentUserService currentUserService;

        public UpdateUserCommand(ICurrentUserService currentUserService)
        {
            this.currentUserService = currentUserService;
        }

        public int CustId { get; set; }
        
        public string UserPwd { get; set; }

        public string OldUserPwd { get; set; }

        public int UserId => currentUserService.UserId;

        public bool? Closed { get; set; }

        public string FirstName	 { get; set; }
        
        public string LastName	 { get; set; }

        public int? GroupId { get; set; }
        
        public int ErrCode { get; set; }

        public string ErrMsg { get; set; }

        public override string GetSettingKey()
            => "SLI_User_Upd";

        public override bool IsValid()
            => CustId > 0 && UserId > 0;
    }
}