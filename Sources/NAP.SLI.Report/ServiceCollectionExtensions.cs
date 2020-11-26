namespace NAP.SLI.Report
{
    using Microsoft.Extensions.DependencyInjection;
    using NAP.SLI.Report.Services;

    public static class ServiceCollectionExtensions
    {
        public static void RegisterReportModule(this IServiceCollection services)
        {
            services.AddScoped<IReportService, ReportService>();
            services.AddScoped<IWinLossDetailService, WinLossDetailService>();
        }
    }
}
