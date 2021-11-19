using Microsoft.AspNetCore.Authorization;

namespace NAP.SLI.Common.Models
{
    public class AuthorizationPolicies
    {
        public const string Admin = "Admin";

        public static AuthorizationPolicy AdminPolicy => new AuthorizationPolicyBuilder().RequireAuthenticatedUser().RequireClaim(NapClaimTypes.IsAdmin, "0").Build();
    }
}