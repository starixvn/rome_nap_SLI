namespace NAP.SimpleApi.Models
{
    using Fanex.Data.Repository;
    using Microsoft.AspNetCore.Http;
    using Models;
    using System;

    public interface IRequestActivator
    {
        void AuthorizeRequest(HttpContext httpContext, RequestOption request);

        ICriteria CreateCriteria(HttpContext httpContext, RequestOption request);
    }

    public class RequestActivator: IRequestActivator
    {
        public virtual void AuthorizeRequest(HttpContext httpContext, RequestOption request)
        {
        }

        public virtual ICriteria CreateCriteria(HttpContext httpContext, RequestOption request)
        {
            return (ICriteria)Activator.CreateInstance(request.CriteriaType);
        }
    }
}
