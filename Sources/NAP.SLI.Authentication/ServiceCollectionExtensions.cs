namespace NAP.SLI.Authentication
{
    using Microsoft.Extensions.DependencyInjection;
    using NAP.SLI.Authentication.Repositories;

    public static class ServiceCollectionExtensions
    {
        public static void RegisterAuthenticationModule(this IServiceCollection services)
        {
            services.AddScoped<IUserRepository, UserRepository>();
        }
    }
}
