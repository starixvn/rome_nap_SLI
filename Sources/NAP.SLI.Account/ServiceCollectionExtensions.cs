namespace NAP.SLI.Account
{
    using Microsoft.Extensions.DependencyInjection;
    using NAP.SLI.Account.Services;
    using System.IdentityModel.Tokens.Jwt;

    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddAccountModule(this IServiceCollection services)
        {
            services.AddScoped<JwtSecurityTokenHandler, JwtSecurityTokenHandler>();
            services.AddScoped<ITokenManager, TokenManager>();
            return services;
        }
    }
}
