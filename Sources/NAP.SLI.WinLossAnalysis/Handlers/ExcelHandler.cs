namespace NAP.SLI.WinLossAnalysis.Handlers
{
    using System;
    using System.Threading;
    using System.Threading.Tasks;
    using MediatR;
    using NAP.SLI.Common.Models;
    using NAP.SLI.WinLossAnalysis.Requests;
    using NAP.SLI.WinLossAnalysis.Services;

    public class ExcelHandler : IRequestHandler<ExcelRequest, byte[]>
    {
        private readonly IExcelService service;

        public ExcelHandler(IExcelService service)
        {
            this.service = service;
        }

        public async Task<byte[]> Handle(ExcelRequest request, CancellationToken cancellationToken)
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
