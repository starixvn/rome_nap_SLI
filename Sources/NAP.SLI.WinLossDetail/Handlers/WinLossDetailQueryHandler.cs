namespace NAP.SLI.WinLossDetail.Handlers
{
    using System;
    using System.Threading;
    using System.Threading.Tasks;
    using MediatR;
    using NAP.SLI.Common.Models;
    using NAP.SLI.WinLossDetail.Requests;
    using NAP.SLI.WinLossDetail.Services;

    public class WinLossDetailQueryHandler : IRequestHandler<WinLossDetailQueryRequest, object>
    {
        private readonly IWinLossDetailQueryService service;

        public WinLossDetailQueryHandler(IWinLossDetailQueryService service)
        {
            this.service = service;
        }

        public async Task<object> Handle(WinLossDetailQueryRequest request, CancellationToken cancellationToken)
        {
            return request.RoleId switch
            {
                (int)CustomerLevels.Super => await service.QuerySuper(request).ConfigureAwait(false),
                (int)CustomerLevels.Master => await service.QueryMaster(request).ConfigureAwait(false),
                (int)CustomerLevels.Agent => await service.QueryAgent(request).ConfigureAwait(false),
                _ => throw new NotImplementedException()
            };
        }
    }
}
