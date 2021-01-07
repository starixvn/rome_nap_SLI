namespace NAP.SLI.WinLossAnalysis.Handlers
{
    using System.Threading;
    using System.Threading.Tasks;
    using MediatR;
    using NAP.SLI.WinLossAnalysis.Models;
    using NAP.SLI.WinLossAnalysis.Requests;
    using NAP.SLI.WinLossAnalysis.Services;

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
