namespace NAP.SLI.UserManagement
{
    using NAP.SimpleApi.Models;
    using NAP.SLI.Common.Models;
    using NAP.SLI.UserManagement.Commands;
    using NAP.SLI.UserManagement.Criteria;

    public class SimpleApiProfile : Profile
    {
        public SimpleApiProfile()
            : base("user-management")
        {
            var optionExtra = new OptionExtra
            {
                Policy = AuthorizationPolicies.AdministrationPolicy
            };
            AddQuery<QueryUserCriteria>("query-user", optionExtra);
            AddCommand<UpdateUserStatusCommand>("update-user-status", optionExtra);
            AddCommand<ChangeUserPasswordCommand>("change-user-password", optionExtra);
            AddCommand<AddNewUserCommnad>("add-new-user", optionExtra);
            AddCommand<UpdateUserCommand>("update-user", optionExtra);
        }
    }
}
