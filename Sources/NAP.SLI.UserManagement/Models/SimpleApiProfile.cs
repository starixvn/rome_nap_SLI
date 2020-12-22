namespace NAP.SLI.UserManagement.Models
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
            AddQuery<QueryUserCriteria>("query-user", AuthorizationPolicies.AdministrationPolicy);
            AddCommand<UpdateUserStatusCommand>("update-user-status", AuthorizationPolicies.AdministrationPolicy);
            AddCommand<ChangeUserPasswordCommand>("change-user-password", AuthorizationPolicies.AdministrationPolicy);
            AddCommand<AddNewUserCommnad>("add-new-user", AuthorizationPolicies.AdministrationPolicy);
            AddCommand<UpdateUserCommand>("update-user", AuthorizationPolicies.AdministrationPolicy);
        }
    }
}
