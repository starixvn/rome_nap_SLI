namespace NAP.SLI.Customer
{
    using Microsoft.Extensions.DependencyInjection;
    using NAP.SLI.Customer.Services;

    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddCustomerModule(this IServiceCollection services)
        {
            services.AddScoped<ICustomerService, CustomerService>();
            return services;
        }
    }
}
