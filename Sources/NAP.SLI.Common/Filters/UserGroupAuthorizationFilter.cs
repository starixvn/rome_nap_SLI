namespace NAP.SLI.Common.Filters
{
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Filters;
    using NAP.SLI.Common.Models;

    public class UserGroupAuthorizationFilter : IAuthorizationFilter
    {
        private readonly UserGroups userGroup;

        public UserGroupAuthorizationFilter(UserGroups userGroup)
            => (this.userGroup) = (userGroup);

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            context.Result = new UnauthorizedResult();
        }
    }
}
