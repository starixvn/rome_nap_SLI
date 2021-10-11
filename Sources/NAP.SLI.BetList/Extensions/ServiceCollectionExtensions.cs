namespace NAP.SLI.BetList.Extensions
{
    using Microsoft.Extensions.DependencyInjection;
    using NAP.SLI.BetList.Services;

    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddBetListModule(this IServiceCollection services)
        {
            services.AddScoped<IQueryService, QueryService>();
            return services;
        }
    }
}