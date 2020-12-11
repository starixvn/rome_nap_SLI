namespace NAP.SLI.Customer.Extensions
{
    using Microsoft.Extensions.DependencyInjection;
    using NAP.SLI.Customer.Services;

    public static class ServiceCollectionExtensions
    {
        public static void AddCustomerModule(this IServiceCollection services)
        {
            services.AddScoped<ICustomerService, CustomerService>();
        }
    }
}
