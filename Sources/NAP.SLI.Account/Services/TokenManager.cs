namespace NAP.SLI.Account.Services
{
    using System;
    using System.IdentityModel.Tokens.Jwt;
    using System.Security.Claims;
    using System.Text;
    using Microsoft.Extensions.Options;
    using Microsoft.IdentityModel.Tokens;
    using NAP.SLI.Account.Models;
    using NAP.SLI.Common.Models;

    public interface ITokenManager
    {
        string Generate(TokenModel model);

        TokenModel Validate(string token);

        AuthenticationModel Refresh(string token);
    }

    public class TokenManager : ITokenManager
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

        public TokenManager(IOptions<AuthenticationSettings> authenticationSettingsOptions, JwtSecurityTokenHandler tokenHandler)
        {
            authenticationSettings = authenticationSettingsOptions.Value;
            this.tokenHandler = tokenHandler;
        }

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

        public TokenModel Validate(string token)
        {
            try
            {
                var claims = tokenHandler.ValidateToken(token, ValidationParameters, out var securityToken);
                var username = claims.FindFirst(x => x.Type == ClaimTypes.Name).Value;
                var userId = int.Parse(claims.FindFirst(x => x.Type == NapClaimTypes.UserId).Value);
                var groupId = int.Parse(claims.FindFirst(x => x.Type == NapClaimTypes.GroupId).Value);
                return new TokenModel(username, userId, groupId);
            }
            catch
            {
                return null;
            }
        }

        public AuthenticationModel Refresh(string token)
        {
            var tokenModel = Validate(token);
            if (tokenModel == null)
            {
                return new AuthenticationModel
                {
                    ErrCode = ErrorCodes.GenericError
                };
            }

            var newToken = Generate(tokenModel);
            return new AuthenticationModel
            {
                UserId = tokenModel.UserId,
                GroupId = tokenModel.GroupId,
                Token = newToken
            };
        }
    }
}
