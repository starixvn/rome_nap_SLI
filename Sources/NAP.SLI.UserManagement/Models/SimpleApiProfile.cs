namespace NAP.SLI.UserManagement.Models
{
    using NAP.SimpleApi.Models;
    using NAP.SLI.UserManagement.Commands;
    using NAP.SLI.UserManagement.Criteria;

    public class SimpleApiProfile : Profile
    {
        public SimpleApiProfile()
            : base("user-management")
        {
            AddQuery<QueryUserCriteria>("query-user");
            AddCommand<UpdateUserStatusCommand>("update-user-status");
            AddCommand<ChangeUserPasswordCommand>("change-user-password");
            AddCommand<AddNewUserCommnad>("add-new-user");
            AddCommand<UpdateUserCommand>("update-user");
        }
    }
}
