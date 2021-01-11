namespace NAP.SLI.Account.Extensions
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
            services.AddScoped<IAuthenticationService, AuthenticationService>();
            return services;
        }
    }
}
