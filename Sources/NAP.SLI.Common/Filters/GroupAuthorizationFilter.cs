namespace NAP.SLI.Common.Filters
{
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Filters;
    using NAP.SLI.Common.Models;

    public class GroupAuthorizationFilter : IAuthorizationFilter
    {
        private readonly UserGroups group;

        public GroupAuthorizationFilter(UserGroups group)
            => (this.group) = (group);

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            context.Result = new UnauthorizedResult();
        }
    }
}
