namespace NAP.SLI.Authentication.Handlers
{
    using Fanex.Data.Repository;
    using MediatR;
    using Microsoft.AspNetCore.Mvc;
    using NAP.SLI.Authentication.Commands;
    using NAP.SLI.Authentication.Criteria;
    using NAP.SLI.Common.Extensions;
    using System.Threading;
    using System.Threading.Tasks;

    public class SetPasswordHandler : IRequestHandler<SetPasswordRequest, IActionResult>
    {
        private readonly IDynamicRepository dynamicRepository;

        public SetPasswordHandler(IDynamicRepository dynamicRepository)
            => (this.dynamicRepository) = (dynamicRepository);

        public async Task<IActionResult> Handle(SetPasswordRequest request, CancellationToken cancellationToken)
        {
            var criteria = new UpdatePasswordCriteria
            {
                UserId = request.UserId,
                OldPassword = request.Password
            };
            criteria.ThrowExceptionIfInvalid();
            await dynamicRepository.ExecuteAsync(criteria);
            criteria.ThrowExceptionIfFailed();
            return new ContentResult();
        }
    }
}
