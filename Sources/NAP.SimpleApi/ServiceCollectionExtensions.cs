namespace NAP.SimpleApi
{
    using Microsoft.Extensions.DependencyInjection;
    using NAP.SimpleApi.Models;
    using System.Collections.Generic;

    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddSimpleApi(this IServiceCollection services, IList<RequestOption> requestOptions)
        {
            services.AddSimpleApi(requestOptions, new RequestOptionContext());
            return services;
        }

        public static IServiceCollection AddSimpleApi(this IServiceCollection services, IList<RequestOption> requestOptions, IRequestOptionContext criteriaActivator)
        {
            var configuration = new Configuration(requestOptions, criteriaActivator);
            services.AddSingleton(configuration);
            return services;
        }
    }
}
