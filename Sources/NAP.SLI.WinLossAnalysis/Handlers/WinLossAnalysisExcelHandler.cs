namespace NAP.SLI.WinLossAnalysis.Handlers
{
    using System;
    using System.Threading;
    using System.Threading.Tasks;
    using MediatR;
    using NAP.SLI.Common.Models;
    using NAP.SLI.WinLossAnalysis.Requests;
    using NAP.SLI.WinLossAnalysis.Services;

    public class WinLossAnalysisExcelHandler : IRequestHandler<WinLossAnalysisExcelRequest, byte[]>
    {
        private readonly IWinLossAnalysisService service;

        public WinLossAnalysisExcelHandler(IWinLossAnalysisService service)
        {
            this.service = service;
        }

        public async Task<byte[]> Handle(WinLossAnalysisExcelRequest request, CancellationToken cancellationToken)
        {
            return request.RoleId switch
            {
                (int)CustomerLevels.Super => await service.ExcelViewSuper(request).ConfigureAwait(false),
                (int)CustomerLevels.Master => await service.ExcelViewMaster(request).ConfigureAwait(false),
                (int)CustomerLevels.Agent => await service.ExcelViewAgent(request).ConfigureAwait(false),
                _ => throw new NotImplementedException()
            };
        }
    }
}
