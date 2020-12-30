namespace NAP.SLI.Report.Handlers
{
    using System.Threading;
    using System.Threading.Tasks;
    using MediatR;
    using NAP.SLI.Report.Requests;
    using NAP.SLI.Report.Services;

    public class WinLossDetailExcelHandler : IRequestHandler<WinLossDetailExcelRequest, byte[]>
    {
        private readonly IWinLossDetailService winLossDetailService;

        public WinLossDetailExcelHandler(IWinLossDetailService winLossDetailService)
        {
            this.winLossDetailService = winLossDetailService;
        }

        public async Task<byte[]> Handle(WinLossDetailExcelRequest request, CancellationToken cancellationToken)
        {
            return await winLossDetailService.Excel(request).ConfigureAwait(false);
        }
    }
}
