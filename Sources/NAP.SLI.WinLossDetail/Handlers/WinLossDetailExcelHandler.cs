namespace NAP.SLI.WinLossDetail.Handlers
{
    using System;
    using System.Threading;
    using System.Threading.Tasks;
    using MediatR;
    using NAP.SLI.Common.Models;
    using NAP.SLI.WinLossDetail.Requests;
    using NAP.SLI.WinLossDetail.Services;

    public class WinLossDetailExcelHandler : IRequestHandler<WinLossDetailExcelRequest, byte[]>
    {
        private readonly IWinLossDetailExcelService service;

        public WinLossDetailExcelHandler(IWinLossDetailExcelService service)
        {
            this.service = service;
        }

        public async Task<byte[]> Handle(WinLossDetailExcelRequest request, CancellationToken cancellationToken)
        {
            return request.RoleId switch
            {
                (int)CustomerLevels.Super => await service.ExcelSuper(request).ConfigureAwait(false),
                (int)CustomerLevels.Master => await service.ExcelMaster(request).ConfigureAwait(false),
                (int)CustomerLevels.Agent => await service.ExcelAgent(request).ConfigureAwait(false),
                _ => throw new NotImplementedException()
            };
        }
    }
}
