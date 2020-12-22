namespace NAP.SimpleApi.Extensions
{
    using Microsoft.Extensions.DependencyInjection;
    using NAP.SimpleApi.Models;
    using System;
    using System.Collections.Generic;
    using System.Linq;

    public static class ServiceCollectionExtensions
    {
        public static IEnumerable<RequestOption> RequestOptions { get; private set; } = new List<RequestOption>();
        private static bool isServiceRegistered = false;

        public static IServiceCollection AddSimpleApi(this IServiceCollection services, Type type)
        {
            RegisterService(services);
            var profile = Activator.CreateInstance(type) as Profile;
            var requestOptions = profile.RequestOptions.Select(x =>
            {
                string apiKey = string.IsNullOrEmpty(profile.Prefix) ? x.ApiKey : $"{profile.Prefix}:{x.ApiKey}";
                return new RequestOption(apiKey, x.CriteriaType, x.ActionType, x.Policy);
            });
            RequestOptions = RequestOptions.Concat(requestOptions);
            ValidateDuplicateKeys();
            return services;
        }

        private static void ValidateDuplicateKeys()
        {
            var duplicateApiKeys = RequestOptions.GroupBy(x => x.ApiKey).Where(g => g.Count() > 1).Select(g => g.Key);
            if (duplicateApiKeys.Any())
            {
                throw new InvalidOperationException("Duplicate API Keys: " + string.Join(", ", duplicateApiKeys));
            }
        }

        private static void RegisterService(this IServiceCollection services)
        {
            if (isServiceRegistered)
            {
                return;
            }

            services.AddScoped<IRequestOptionContext, RequestOptionContext>();
            isServiceRegistered = true;
        }
    }
}
