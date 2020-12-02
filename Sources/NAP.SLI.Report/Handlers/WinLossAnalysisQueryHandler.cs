namespace NAP.SLI.Report.Handlers
{
    using System.Threading;
    using System.Threading.Tasks;
    using MediatR;
    using NAP.SLI.Report.Models;
    using NAP.SLI.Report.Requests;
    using NAP.SLI.Report.Services;

    public class WinLossAnalysisQueryHandler : IRequestHandler<WinLossAnalysisQueryRequest, QueryModel>
    {
        private readonly IWinLossAnalysisService winLossAnalysisService;

        public WinLossAnalysisQueryHandler(IWinLossAnalysisService winLossAnalysisService)
        {
            this.winLossAnalysisService = winLossAnalysisService;
        }

        public async Task<QueryModel> Handle(WinLossAnalysisQueryRequest request, CancellationToken cancellationToken)
        {
            return await winLossAnalysisService.Query(request).ConfigureAwait(false);
        }
    }
}
