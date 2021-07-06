namespace NAP.SLI.WinLossByBetType.Extensions
{
    using Microsoft.Extensions.DependencyInjection;
    using NAP.SLI.WinLossByBetType.Services;

    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddWinLossByBetTypeModule(this IServiceCollection services)
        {
            services.AddScoped<IQueryService, QueryService>();
            services.AddScoped<IExcelService, ExcelService>();
            return services;
        }
    }
}
