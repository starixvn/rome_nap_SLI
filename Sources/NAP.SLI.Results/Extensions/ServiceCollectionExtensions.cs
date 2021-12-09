namespace NAP.SLI.Results.Extensions
{
    using Microsoft.Extensions.DependencyInjection;
    using NAP.SLI.Results.Services;

    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddResultsModule(this IServiceCollection services)
        {
            services.AddScoped<IThirdPartyResultService, ThirdPartyResultService>();
            services.AddScoped<IResultService, ResultService>();
            services.AddScoped<IExcelService, ExcelService>();
            return services;
        }
    }
}