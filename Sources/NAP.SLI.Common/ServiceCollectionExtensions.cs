namespace NAP.SLI.Common
{
    using Microsoft.Extensions.DependencyInjection;
    using NAP.SLI.Common.Services;

    public static class ServiceCollectionExtensions
    {
        public static void RegisterCommonModule(this IServiceCollection services)
        {
            services.AddScoped<ICurrentContextService, CurrentContextService>();
            services.AddScoped<ICurrentUserService, CurrentUserService>();
        }
    }
}
