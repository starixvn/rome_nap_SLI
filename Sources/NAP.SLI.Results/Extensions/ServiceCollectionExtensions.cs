namespace NAP.SLI.Results.Extensions
{
    using Microsoft.Extensions.DependencyInjection;
    using NAP.SLI.Results.Services;

    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddResultsModule(this IServiceCollection services)
        {
            services.AddScoped<IThirdPartyResultService, ThirdPartyResultService>();
            return services;
        }
    }
}