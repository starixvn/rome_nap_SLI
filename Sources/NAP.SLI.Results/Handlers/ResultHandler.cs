namespace NAP.SLI.Results.Handlers
{
    using System.Collections.Generic;
    using System.Threading;
    using System.Threading.Tasks;
    using MediatR;
    using NAP.SLI.Results.Models;
    using NAP.SLI.Results.Requests;
    using NAP.SLI.Results.Services;

    public class ResultHandler : IRequestHandler<ResultRequest, IEnumerable<ResultRecordModel>>
    {
        private readonly IResultService service;

        public ResultHandler(IResultService service)
        {
            this.service = service;
        }

        public async Task<IEnumerable<ResultRecordModel>> Handle(ResultRequest request, CancellationToken cancellationToken)
        {
            return await service.GetResult(request).ConfigureAwait(false);
        }
    }
}