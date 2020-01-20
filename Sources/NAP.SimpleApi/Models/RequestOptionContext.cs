namespace NAP.SimpleApi.Models
{
    using Fanex.Data.Repository;
    using Microsoft.AspNetCore.Http;
    using NAP.SimpleApi.Helpers;
    using Newtonsoft.Json.Linq;
    using System;

    public interface IRequestOptionContext
    {
        void AuthorizeRequest(HttpContext httpContext, RequestOption request);

        ICriteria CreateCriteria(HttpContext httpContext, RequestOption request, JObject payload);
    }

    public class RequestOptionContext: IRequestOptionContext
    {
        public virtual void AuthorizeRequest(HttpContext httpContext, RequestOption request)
        {
        }

        public virtual ICriteria CreateCriteria(HttpContext httpContext, RequestOption request, JObject payload)
        {
            var criteria = (ICriteria)Activator.CreateInstance(request.CriteriaType);
            ObjectHelper.CopyProperties(payload, criteria);
            return criteria;
        }
    }
}
