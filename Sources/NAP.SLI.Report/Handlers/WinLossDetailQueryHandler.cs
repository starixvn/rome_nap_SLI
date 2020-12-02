namespace NAP.SLI.Report.Handlers
{
    using System.Threading;
    using System.Threading.Tasks;
    using MediatR;
    using NAP.SLI.Report.Models;
    using NAP.SLI.Report.Requests;
    using NAP.SLI.Report.Services;

    public class WinLossDetailQueryHandler : IRequestHandler<WinLossDetailQueryRequest, QueryModel>
    {
        private readonly IWinLossDetailService winLossDetailService;

        public WinLossDetailQueryHandler(IWinLossDetailService winLossDetailService)
        {
            this.winLossDetailService = winLossDetailService;
        }

        public async Task<QueryModel> Handle(WinLossDetailQueryRequest request, CancellationToken cancellationToken)
        {
            return await winLossDetailService.Query(request).ConfigureAwait(false);
        }
    }
}
