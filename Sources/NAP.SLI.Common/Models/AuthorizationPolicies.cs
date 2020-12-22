using Microsoft.AspNetCore.Authorization;

namespace NAP.SLI.Common.Models
{
    public class AuthorizationPolicies
    {
        public const string User = "User";
        public const string Administration = "Administrator";

        public static AuthorizationPolicy UserPolicy => new AuthorizationPolicyBuilder().RequireAuthenticatedUser().RequireClaim(NapClaimTypes.GroupId, ((int)UserGroups.User).ToString()).Build();

        public static AuthorizationPolicy AdministrationPolicy => new AuthorizationPolicyBuilder().RequireAuthenticatedUser().RequireClaim(NapClaimTypes.GroupId, ((int)UserGroups.Administrator).ToString()).Build();
    }
}