namespace NAP.SLI.Results.Handlers
{
    using System;
    using System.Threading;
    using System.Threading.Tasks;
    using MediatR;
    using NAP.SLI.Common.Models;
    using NAP.SLI.Results.Requests;
    using NAP.SLI.Results.Services;

    public class ExcelHandler : IRequestHandler<ExcelRequest, byte[]>
    {
        private readonly IExcelService service;

        public ExcelHandler(IExcelService service)
        {
            this.service = service;
        }

        public async Task<byte[]> Handle(ExcelRequest request, CancellationToken cancellationToken)
        {
            return request.SportType switch
            {
                (int)SportTypes.NumberGame => await service.ExcelNumberGameResult(request).ConfigureAwait(false),
                (int)SportTypes.Happy5 => await service.ExcelHappy5Result(request).ConfigureAwait(false),
                _ => throw new NotImplementedException()
            };
        }
    }
}