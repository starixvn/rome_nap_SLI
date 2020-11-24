namespace NAP.SLI.Account.Handlers
{
    using AutoMapper;
    using Fanex.Data.Repository;
    using MediatR;
    using NAP.SLI.Account.Criteria;
    using NAP.SLI.Account.Models;
    using NAP.SLI.Account.Requests;
    using NAP.SLI.Account.Services;
    using NAP.SLI.Common.Extensions;
    using NAP.SLI.Common.Services;
    using System.Threading;
    using System.Threading.Tasks;

    public class LoginHandler : IRequestHandler<LoginRequest, AuthenticationModel>
    {
        private readonly ITokenService tokenService;
        private readonly IDynamicRepository dynamicRepository;
        private readonly ICurrentContextService currentContextService;
        private readonly IMapper mapper;

        public LoginHandler(
            ITokenService tokenService,
            IDynamicRepository dynamicRepository,
            ICurrentContextService currentContextService,
            IMapper mapper)
            => (this.tokenService, this.dynamicRepository, this.currentContextService, this.mapper) = (tokenService, dynamicRepository, currentContextService, mapper);

        public async Task<AuthenticationModel> Handle(LoginRequest request, CancellationToken cancellationToken)
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
            criteria.ThrowExceptionIfInvalid();
            await dynamicRepository.ExecuteAsync(criteria).ConfigureAwait(false);
            var loginResult = mapper.Map<AuthenticationModel>(criteria);
            if (loginResult.IsSuccess)
            {
                var tokenModel = new TokenModel(request.Username, loginResult.UserId, loginResult.GroupId);
                loginResult.Token = tokenService.Generate(tokenModel);
            }

            return loginResult;
        }
    }
}
