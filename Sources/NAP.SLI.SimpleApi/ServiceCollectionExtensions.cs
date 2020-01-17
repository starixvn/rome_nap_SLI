namespace NAP.SLI.SimpleApi
{
    using Microsoft.Extensions.DependencyInjection;
    using NAP.SimpleApi;
    using NAP.SimpleApi.Models;
    using NAP.SLI.SimpleApi.Administration;
    using System.Collections.Generic;

    public static class ServiceCollectionExtensions
    {
        public static void RegisterSimpleApiModule(this IServiceCollection services)
        {
            var requestOptions = new List<RequestOption>
            {
                new RequestOption {ApiKey = "administration-query-user", CriteriaType = typeof(QueryUserCriteria)}
            };
            services.AddSimpleApi(requestOptions, new RequestActivator());
        }
    }
}
