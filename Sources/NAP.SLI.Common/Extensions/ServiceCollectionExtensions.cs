namespace NAP.SLI.Common.Extensions
{
    using Microsoft.Extensions.DependencyInjection;
    using NAP.SLI.Common.Services;

    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddCommonModule(this IServiceCollection services, IAppSettings appSettings)
        {
            services.AddSingleton(appSettings);
            services.AddSingleton<ICacheContainer, CacheContainer>();
            services.AddScoped<ICurrentContextService, CurrentContextService>();
            services.AddScoped<ICurrentUserService, CurrentUserService>();
            services.AddScoped<IDynamicRepositoryEx, DynamicRepositoryEx>();
            services.AddScoped<IReportService, ReportService>();
            return services;
        }
    }
}
