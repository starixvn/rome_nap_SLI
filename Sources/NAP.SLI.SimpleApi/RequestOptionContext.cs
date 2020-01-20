namespace NAP.SLI.SimpleApi
{
    using Fanex.Data.Repository;
    using Microsoft.AspNetCore.Http;
    using Microsoft.Extensions.DependencyInjection;
    using NAP.SimpleApi.Helpers;
    using NAP.SimpleApi.Models;
    using Newtonsoft.Json.Linq;

    public class RequestOptionContext : IRequestOptionContext
    {
        public void AuthorizeRequest(HttpContext httpContext, RequestOption request)
        {
            var userIdentity = httpContext.User.Identity;
        }

        public ICriteria CreateCriteria(HttpContext httpContext, RequestOption request, JObject payload)
        {
            var criteria = (ICriteria)ActivatorUtilities.CreateInstance(httpContext.RequestServices, request.CriteriaType);
            ObjectHelper.CopyProperties(payload, criteria);
            return criteria;
        }
    }
}
