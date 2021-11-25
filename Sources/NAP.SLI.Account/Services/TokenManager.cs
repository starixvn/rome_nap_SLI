namespace NAP.SLI.Account.Services
{
    using System;
    using System.IdentityModel.Tokens.Jwt;
    using System.Security.Claims;
    using System.Text;
    using Microsoft.IdentityModel.Tokens;
    using NAP.SLI.Account.Models;
    using NAP.SLI.Common.Models;
    using NAP.SLI.Common.Services;

    public interface ITokenManager
    {
        string Generate(TokenModel model);
    }

    public class TokenManager : ITokenManager
    {
        private readonly AuthenticationSettings authenticationSettings;
        private readonly JwtSecurityTokenHandler tokenHandler;

        public TokenManager(IAppSettings appSettings, JwtSecurityTokenHandler tokenHandler)
        {
            authenticationSettings = appSettings.Authentication;
            this.tokenHandler = tokenHandler;
        }

        public TokenValidationParameters ValidationParameters
        {
            get
            {
                var key = Encoding.ASCII.GetBytes(authenticationSettings.SecretKey);
                return new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            }
        }

        public string Generate(TokenModel model)
        {
            var accessExpiration = authenticationSettings.AccessExpiration;
#if DEBUG
            /// extend access expiration for unit testing
            accessExpiration = 43200;
#endif

            var key = Encoding.ASCII.GetBytes(authenticationSettings.SecretKey);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, model.Username),
                    new Claim(NapClaimTypes.OnUserId, model.OnUserId.ToString(), ClaimValueTypes.Integer),
                    new Claim(NapClaimTypes.UserId, model.UserId.ToString(), ClaimValueTypes.Integer),
                    new Claim(NapClaimTypes.IsAdmin, model.IsAdmin.ToString(), ClaimValueTypes.Boolean)
                }),
                Expires = DateTime.UtcNow.AddMinutes(accessExpiration),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
