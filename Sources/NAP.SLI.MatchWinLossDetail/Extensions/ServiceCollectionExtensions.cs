namespace NAP.SLI.MatchWinLossDetail.Extensions
{
    using Microsoft.Extensions.DependencyInjection;
    using NAP.SLI.MatchWinLossDetail.Services;

    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddMatchWinLossDetailModule(this IServiceCollection services)
        {
            services.AddScoped<IQueryService, QueryService>();
            services.AddScoped<IExcelService, ExcelService>();
            return services;
        }
    }
}
