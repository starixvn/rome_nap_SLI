namespace NAP.SLI.BetList.Extensions
{
    using System;
    using System.Net;
    using System.Net.Http;
    using Microsoft.Extensions.DependencyInjection;
    using NAP.SLI.BetList.Services;

    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddBetListModule(this IServiceCollection services)
        {
            services.AddScoped<IQueryService, QueryService>();
            services.AddHttpClient<IQueryService, QueryService>(httpClient =>
            {
                httpClient.Timeout = TimeSpan.FromMinutes(5);
            }).ConfigurePrimaryHttpMessageHandler(httpClient =>
            {
                return new HttpClientHandler()
                {
                    AutomaticDecompression = DecompressionMethods.GZip | DecompressionMethods.Deflate
                };
            });
            return services;
        }
    }
}