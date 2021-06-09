using Microsoft.Extensions.DependencyInjection;
using NAP.UM.Models;
using NAP.UM.Services;

namespace NAP.UM
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddUM(this IServiceCollection services, UMConfig umConfig)
        {
            services.AddSingleton(umConfig);
            services.AddSingleton<IMaintenanceService, MaintenanceService>();
            return services;
        }
    }
}