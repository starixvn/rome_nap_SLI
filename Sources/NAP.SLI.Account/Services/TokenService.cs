namespace NAP.SLI.Account.Services
{
    using Microsoft.Extensions.Options;
    using Microsoft.IdentityModel.Tokens;
    using NAP.SLI.Account.Models;
    using NAP.SLI.Common.Models;
    using System;
    using System.IdentityModel.Tokens.Jwt;
    using System.Security.Claims;
    using System.Text;

    public interface ITokenService
    {
        string Generate(TokenModel model);

        AuthenticationModel Refresh(string token);
    }

    public class TokenService : ITokenService
    {
        private readonly AuthenticationSettings authenticationSettings;
        private readonly JwtSecurityTokenHandler tokenHandler;

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

        public TokenService(
            IOptions<AuthenticationSettings> authenticationSettingsOptions,
            JwtSecurityTokenHandler tokenHandler
            )
            => (authenticationSettings, this.tokenHandler) = (authenticationSettingsOptions.Value, tokenHandler);

        public string Generate(TokenModel model)
        {
            var key = Encoding.ASCII.GetBytes(authenticationSettings.SecretKey);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, model.Username),
                    new Claim(NapClaimTypes.UserId, model.UserId.ToString()),
                    new Claim(NapClaimTypes.GroupId, model.GroupId.ToString())
                }),
                Expires = DateTime.UtcNow.AddMinutes(authenticationSettings.AccessExpiration),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public AuthenticationModel Refresh(string token)
        {
            try
            {
                var claims = tokenHandler.ValidateToken(token, ValidationParameters, out var securityToken);
                var username = claims.FindFirst(x => x.Type == ClaimTypes.Name).Value;
                var userId = int.Parse(claims.FindFirst(x => x.Type == NapClaimTypes.UserId).Value);
                var groupId = int.Parse(claims.FindFirst(x => x.Type == NapClaimTypes.GroupId).Value);
                var tokenModel = new TokenModel(username, userId, groupId);
                var newToken = Generate(tokenModel);
                return new AuthenticationModel
                {
                    UserId = userId,
                    GroupId = groupId,
                    Token = newToken
                };
            }
            catch (Exception ex)
            {
                return new AuthenticationModel
                {
                    ErrCode = 1,
                    ErrMsg = ex.Message
                };
            }
        }
    }
}
