namespace NAP.SLI.UserManagement.Commands
{
    using Fanex.Data.Repository;
    using NAP.SLI.Common.Criteria;
    using NAP.SLI.Common.Services;

    public class UpdateUserStatusCommand : ResultCriteriaBase, INonQueryCommand
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

        public override string GetSettingKey() => "Acc_Con_AdminUpdClosed";

        public override bool IsValid() => CustId > 0;
    }
}