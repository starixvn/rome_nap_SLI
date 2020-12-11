namespace NAP.SLI.Report.Extensions
{
    using Microsoft.Extensions.DependencyInjection;
    using NAP.SLI.Report.Services;

    public static class ServiceCollectionExtensions
    {
        public static void AddReportModule(this IServiceCollection services)
        {
            services.AddScoped<IReportService, ReportService>();
            services.AddScoped<IWinLossDetailService, WinLossDetailService>();
            services.AddScoped<IWinLossAnalysisService, WinLossAnalysisService>();
        }
    }
}
