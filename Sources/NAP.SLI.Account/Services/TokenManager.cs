namespace NAP.SLI.Account.Services
{
    using System;
    using System.IdentityModel.Tokens.Jwt;
    using System.Security.Claims;
    using System.Text;
    using Fanex.NAP.Client.Models;
    using Microsoft.Extensions.Options;
    using Microsoft.IdentityModel.Tokens;
    using NAP.SLI.Account.Models;
    using NAP.SLI.Common.Models;

    public interface ITokenManager
    {
        string Generate(TokenModel model);
    }

    public class TokenManager : ITokenManager
    {
        private readonly AuthenticationSettings authenticationSettings;
        private readonly JwtSecurityTokenHandler tokenHandler;

        public TokenManager(IOptions<AuthenticationSettings> authenticationSettingsOptions, JwtSecurityTokenHandler tokenHandler)
        {
            authenticationSettings = authenticationSettingsOptions.Value;
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
                Expires = DateTime.UtcNow.AddMinutes(authenticationSettings.AccessExpiration),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
