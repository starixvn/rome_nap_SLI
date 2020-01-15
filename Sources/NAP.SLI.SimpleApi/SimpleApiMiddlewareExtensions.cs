namespace NAP.SLI.SimpleApi
{
    using Microsoft.AspNetCore.Builder;
    using NAP.SLI.SimpleApi.Administration;
    using NAP.SLI.SimpleApi.Core;
    using System.Collections.Generic;

    public static class SimpleApiMiddlewareExtensions
    {
        public static IApplicationBuilder UseSimpleApi(this IApplicationBuilder builder)
        {
            var requestOptions = new List<RequestOption>
            {
                new RequestOption
                {
                    Path = "/api/test",
                    CriteriaType = typeof(QueryUserCriteria)
                }
            };
            Configuration.Instance = new Configuration
            {
                RoutingMap = new RoutingMap(requestOptions),
                CriteriaActivator = new CriteriaActivator()
            };

            return builder.UseMiddleware<SimpleApiMiddleware>();
        }
    }
}
