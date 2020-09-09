namespace NAP.SLI.UserManagement.Commands
{
    using Fanex.Data.Repository;
    using NAP.SLI.Common.Services;

    public class UpdateUserStatusCommand : NonQueryCommand
    {
        private readonly ICurrentUserService currentUserService;

        public UpdateUserStatusCommand(ICurrentUserService currentUserService)
        {
            this.currentUserService = currentUserService;
        }

        public int CustId { get; set; }

        public bool Closed { get; set; }

        public string Language { get; set; }

        public int UserId => currentUserService.UserId;

        public bool IsABS { get; set; }

        public string System { get; set; }

        public int ErrCode { get; set; }

        public string ErrMsg { get; set; }

        public override string GetSettingKey() => "AdminUpdClosed";

        public override bool IsValid() => CustId > 0;
    }
}