namespace NAP.SLI.Authentication.Handlers
{
    using AutoMapper;
    using Fanex.Data.Repository;
    using MediatR;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Options;
    using Microsoft.IdentityModel.Tokens;
    using NAP.SLI.Authentication.Commands;
    using NAP.SLI.Authentication.Criteria;
    using NAP.SLI.Authentication.Models;
    using NAP.SLI.Common.Extensions;
    using NAP.SLI.Common.Models;
    using NAP.SLI.Common.Services;
    using System;
    using System.IdentityModel.Tokens.Jwt;
    using System.Security.Claims;
    using System.Text;
    using System.Threading;
    using System.Threading.Tasks;

    public class LoginHandler : IRequestHandler<LoginRequest, IActionResult>
    {
        private readonly AuthenticationSettings authenticationSettings;
        private readonly IDynamicRepository dynamicRepository;
        private readonly ICurrentContextService currentContextService;
        private readonly IMapper mapper;

        public LoginHandler(
            IOptions<AuthenticationSettings> authenticationSettingsOptions,
            IDynamicRepository dynamicRepository,
            ICurrentContextService currentContextService,
            IMapper mapper)
            => (authenticationSettings, this.dynamicRepository, this.currentContextService, this.mapper) = (authenticationSettingsOptions.Value, dynamicRepository, currentContextService, mapper);

        public async Task<IActionResult> Handle(LoginRequest request, CancellationToken cancellationToken)
        {
            var criteria = new LoginCriteria
            {
                Username = request.Username,
                Password = request.Password,
                LoginIP = currentContextService.GetIP(),
                LoginDomain = currentContextService.GetDomainName(),
                BrowserName = currentContextService.GetBrowserName(),
                CountryCode = currentContextService.GetCountryCode(),
                Platform = currentContextService.GetPlatform()
            };
            criteria.ThrowExceptionIsInvalid();
            await dynamicRepository.ExecuteAsync(criteria);
            var loginResult = mapper.Map<LoginResult>(criteria);
            if (!loginResult.IsSuccessful)
            {
                return new ContentResult
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    Content = loginResult.ErrMsg
                };
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(authenticationSettings.SecretKey);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, request.Username),
                    new Claim(NapClaimTypes.UserId, loginResult.UserId.ToString()),
                    new Claim(NapClaimTypes.GroupId, loginResult.GroupId.ToString())
                }),
                Expires = DateTime.UtcNow.AddMinutes(authenticationSettings.AccessExpiration),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            loginResult.Token = tokenHandler.WriteToken(token);
            return new JsonResult(loginResult);
        }
    }
}
