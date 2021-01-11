namespace NAP.SLI.WinLossAnalysis.Extensions
{
    using Microsoft.Extensions.DependencyInjection;
    using NAP.SLI.WinLossAnalysis.Services;

    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddWinLossAnalysisModule(this IServiceCollection services)
        {
            services.AddScoped<IWinLossAnalysisService, WinLossAnalysisService>();
            return services;
        }
    }
}
