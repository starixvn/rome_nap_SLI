namespace NAP.SLI.Authentication.Handlers
{
    using AutoMapper;
    using Fanex.Data.Repository;
    using MediatR;
    using Microsoft.AspNetCore.Mvc;
    using NAP.SLI.Authentication.Commands;
    using NAP.SLI.Authentication.Criteria;
    using NAP.SLI.Authentication.Models;
    using NAP.SLI.Common.Extensions;
    using NAP.SLI.Common.Services;
    using System.Threading;
    using System.Threading.Tasks;

    public class LoginHandler : IRequestHandler<LoginRequest, IActionResult>
    {
        private readonly IDynamicRepository dynamicRepository;
        private readonly ICurrentContextService currentContextService;
        private readonly IMapper mapper;

        public LoginHandler(IDynamicRepository dynamicRepository, ICurrentContextService currentContextService, IMapper mapper)
        {
            this.dynamicRepository = dynamicRepository;
            this.currentContextService = currentContextService;
            this.mapper = mapper;
        }

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
            if(!loginResult.IsSuccessful)
            {
                return new BadRequestResult();
            }

            return new JsonResult(loginResult);
        }
    }
}
