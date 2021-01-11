namespace NAP.SLI.Common.Extensions
{
    using Microsoft.Extensions.DependencyInjection;
    using NAP.SLI.Common.Services;

    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddCommonModule(this IServiceCollection services, IAppSettings appSettings)
        {
            services.AddSingleton<IAppSettings>(appSettings);
            services.AddScoped<ICurrentContextService, CurrentContextService>();
            services.AddScoped<ICurrentUserService, CurrentUserService>();
            services.AddScoped<IDynamicRepositoryEx, DynamicRepositoryEx>();
            services.AddSingleton<ICacheContainer, CacheContainer>();
            services.AddSingleton<IReportService, ReportService>();
            return services;
        }
    }
}
