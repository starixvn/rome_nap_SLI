namespace NAP.SLI.SimpleApi
{
    using Fanex.Data.Repository;
    using Microsoft.AspNetCore.Http;
    using NAP.SimpleApi.Models;
    using NAP.SLI.Common.Services;
    using System;

    public class RequestActivator : IRequestActivator
    {
        public void AuthorizeRequest(HttpContext httpContext, RequestOption request)
        {
            var userIdentity = httpContext.User.Identity;
        }

        public ICriteria CreateCriteria(HttpContext httpContext, RequestOption request)
        {
            var criteria = (ICriteria)Activator.CreateInstance(request.CriteriaType);
            var currentContextService = (CurrentContextService)httpContext.RequestServices.GetService(typeof(CurrentContextService));
            return criteria;
        }
    }
}
