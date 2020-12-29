using Microsoft.Extensions.DependencyInjection;
using NAP.SLI.Localization.Services;

namespace NAP.SLI.Localization.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static void AddLocalizationModule(this IServiceCollection services)
        {
            services.AddSingleton<ISharedLocalizer, SharedLocalizer>();
        }
    }
}