namespace NAP.SLI.Account.Handlers
{
    using Fanex.NAP.Client.Configuration;
    using Fanex.NAP.Client.Models;
    using Fanex.NAP.Client.Models.ParameterObject;
    using Fanex.NAP.Client.Services;
    using MediatR;
    using NAP.SLI.Account.Models;
    using NAP.SLI.Account.Requests;
    using NAP.SLI.Account.Services;
    using NAP.SLI.Common.Models;
    using NAP.SLI.Common.Services;
    using System;
    using System.Linq;
    using System.Threading;
    using System.Threading.Tasks;
    using static Fanex.NAP.Core.Business.Constant;

    public class LoginHandler : IRequestHandler<LoginRequest, AuthenticationModel>
    {
        private readonly IUserService userService;
        private readonly ISecurityService securityService;
        private readonly ICurrentContextService currentContextService;
        private readonly ITokenManager tokenManager;
        private readonly INapSettings napSettings;

        public LoginHandler(
            IUserService userService,
            ISecurityService securityService,
            ICurrentContextService currentContextService,
            ITokenManager tokenManager,
            INapSettings napSettings)
        {
            this.userService = userService;
            this.securityService = securityService;
            this.currentContextService = currentContextService;
            this.tokenManager = tokenManager;
            this.napSettings = napSettings;
        }

        public async Task<AuthenticationModel> Handle(LoginRequest request, CancellationToken cancellationToken)
        {
            var user = await userService.GetAsync(request.Username).ConfigureAwait(false);
            if (user == null || user.Password != request.Password)
            {
                return new AuthenticationModel
                {
                    ErrCode = ErrorCodes.GenericError,
                    ErrMsg = "Invalid username or password"
                };
            }

            var siteLevels = await userService.GetSiteLevelAsync(user.Id, napSettings.Environment).ConfigureAwait(false);
            var userSiteLevel = siteLevels.FirstOrDefault(s => s.Site.Id == napSettings.SiteId);
            if (userSiteLevel == null)
            {
                return new AuthenticationModel
                {
                    ErrCode = ErrorCodes.GenericError,
                    ErrMsg = "You do not have permission"
                };
            }

            var isAdmin = userSiteLevel.Level == (int)Level.SiteAdmin || userSiteLevel.Level == (int)Level.PortalAdmin;
            var onUserId = await CheckInAsync(user).ConfigureAwait(false);
            var tokenModel = new TokenModel(onUserId, user.Username, user.Id, isAdmin);
            var token = tokenManager.Generate(tokenModel);
            return new AuthenticationModel
            {
                Username = user.Username,
                UserId = user.Id,
                IsAdmin = isAdmin,
                Token = token
            };
        }

        private async Task<int> CheckInAsync(User user)
        {
            var loginParameter = new LoginParameter
            {
                UserId = user.Id,
                Ip = currentContextService.GetIP(),
                Domain = currentContextService.GetDomainName(),
                BrowserName = currentContextService.GetBrowserName(),
                CountryCode = currentContextService.GetCountryCode(),
                Platform = currentContextService.GetPlatform(),
                LoginDate = DateTime.Now,
                NetSessionId = Guid.NewGuid().ToString()
            };
            return await securityService.LoginAsync(loginParameter).ConfigureAwait(false);
        }
    }
}
