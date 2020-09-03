namespace NAP.SLI.Authentication.Handlers
{
    using Fanex.Data.Repository;
    using MediatR;
    using Microsoft.AspNetCore.Mvc;
    using NAP.SLI.Authentication.Criteria;
    using NAP.SLI.Authentication.Requests;
    using NAP.SLI.Common.Extensions;
    using System.Threading;
    using System.Threading.Tasks;

    public class ChangePasswordHandler : IRequestHandler<ChangePasswordRequest, IActionResult>
    {
        private readonly IDynamicRepository dynamicRepository;

        public ChangePasswordHandler(IDynamicRepository dynamicRepository)
            => (this.dynamicRepository) = (dynamicRepository);

        public async Task<IActionResult> Handle(ChangePasswordRequest request, CancellationToken cancellationToken)
        {
            var criteria = new UpdatePasswordCriteria
            {
                CustId = request.CustId,
                OldPassword = request.OldPassword,
                NewPasword = request.NewPassword
            };
            criteria.ThrowExceptionIfInvalid();
            await dynamicRepository.ExecuteAsync(criteria);
            criteria.ThrowExceptionIfFailed();
            return new ContentResult();
        }
    }
}
