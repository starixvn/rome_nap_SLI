namespace NAP.SLI.WinLossDetail.Extensions
{
    using Microsoft.Extensions.DependencyInjection;
    using NAP.SLI.WinLossDetail.Services;

    public static class ServiceCollectionExtensions
    {
        public static void AddWinLossDetailModule(this IServiceCollection services)
        {
            services.AddScoped<IWinLossDetailQueryService, WinLossDetailQueryService>();
            services.AddScoped<IWinLossDetailExcelService, WinLossDetailExcelService>();
        }
    }
}
