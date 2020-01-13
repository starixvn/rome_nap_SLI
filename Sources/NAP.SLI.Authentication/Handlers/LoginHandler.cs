namespace NAP.SLI.Authentication.Handlers
{
    using MediatR;
    using Microsoft.AspNetCore.Mvc;
    using NAP.SLI.Authentication.Commands;
    using NAP.SLI.Authentication.Repositories;
    using System.Threading;
    using System.Threading.Tasks;

    public class LoginHandler : IRequestHandler<LoginRequest, IActionResult>
    {
        private readonly IUserRepository userRepository;

        public LoginHandler(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }

        public async Task<IActionResult> Handle(LoginRequest request, CancellationToken cancellationToken)
        {
            if(request.Username == "sa")
            {
                return new OkResult();
            }

            return new BadRequestResult();
        }
    }
}
