namespace NAP.SLI.WinLossDetail.Extensions
{
    using Microsoft.Extensions.DependencyInjection;
    using NAP.SLI.WinLossDetail.Services;

    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddWinLossDetailModule(this IServiceCollection services)
        {
            services.AddScoped<IQueryService, QueryService>();
            services.AddScoped<IExcelService, ExcelService>();
            return services;
        }
    }
}
