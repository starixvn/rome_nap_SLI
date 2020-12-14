using Microsoft.Extensions.DependencyInjection;
using NAP.UM.Models;
using NAP.UM.Services;

namespace NAP.UM.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static void AddUM(this IServiceCollection services, UMConfig umConfig)
        {
            services.AddSingleton<UMConfig>(umConfig);
            services.AddSingleton<IMaintenanceService, MaintenanceService>();
        }
    }
}