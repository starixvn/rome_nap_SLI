namespace NAP.SimpleApi
{
    using Microsoft.Extensions.DependencyInjection;
    using NAP.SimpleApi.Models;
    using System;
    using System.Collections.Generic;

    public static class ServiceCollectionExtensions
    {
        private static Configuration singletonConfiguration;

        public static IServiceCollection AddSimpleApi(this IServiceCollection services, IEnumerable<RequestOption> requestOptions, IRequestOptionContext requestActivator)
        {
            Register(services, new Configuration(requestOptions, requestActivator));
            return services;
        }

        public static IServiceCollection AddSimpleApi(this IServiceCollection services, Type type)
        {
            var configuration = Register(services);
            var profile = Activator.CreateInstance(type) as Profile;
            configuration.Add(profile.Prefix, profile.RequestOptions);
            return services;
        }

        private static Configuration Register(this IServiceCollection services)
        {
            return singletonConfiguration ?? Register(services, new Configuration());
        }

        private static Configuration Register(this IServiceCollection services, Configuration configuration)
        {
            singletonConfiguration = configuration;
            services.AddSingleton(configuration);
            return configuration;
        }
    }
}
