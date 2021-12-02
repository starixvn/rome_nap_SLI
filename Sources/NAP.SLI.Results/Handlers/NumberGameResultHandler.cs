namespace NAP.SLI.Results.Handlers
{
    using System.Collections.Generic;
    using System.Threading;
    using System.Threading.Tasks;
    using MediatR;
    using NAP.SLI.Results.Models;
    using NAP.SLI.Results.Requests;
    using NAP.SLI.Results.Services;

    public class NumberGameResultHandler : IRequestHandler<NumberGameResultRequest, IEnumerable<NumberGameRecordModel>>
    {
        private readonly IResultService service;

        public NumberGameResultHandler(IResultService service)
        {
            this.service = service;
        }

        public async Task<IEnumerable<NumberGameRecordModel>> Handle(NumberGameResultRequest request, CancellationToken cancellationToken)
        {
            return await service.GetNumberGameResult(request).ConfigureAwait(false);
        }
    }
}