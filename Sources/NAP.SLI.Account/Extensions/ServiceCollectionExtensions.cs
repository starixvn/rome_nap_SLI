namespace NAP.SLI.Account.Extensions
{
    using Microsoft.Extensions.DependencyInjection;
    using NAP.SLI.Account.Services;
    using System.IdentityModel.Tokens.Jwt;

    public static class ServiceCollectionExtensions
    {
        public static void AddAccountModule(this IServiceCollection services)
        {
            services.AddScoped<JwtSecurityTokenHandler, JwtSecurityTokenHandler>();
            services.AddScoped<ITokenService, TokenService>();
        }
    }
}
