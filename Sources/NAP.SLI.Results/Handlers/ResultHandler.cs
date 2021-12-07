namespace NAP.SLI.Results.Handlers
{
    using System;
    using System.Threading;
    using System.Threading.Tasks;
    using MediatR;
    using NAP.SLI.Common.Models;
    using NAP.SLI.Results.Requests;
    using NAP.SLI.Results.Services;

    public class ResultHandler : IRequestHandler<ResultRequest, object>
    {
        private readonly IResultService service;

        public ResultHandler(IResultService service)
        {
            this.service = service;
        }

        public async Task<object> Handle(ResultRequest request, CancellationToken cancellationToken)
        {
            return request.SportType switch
            {
                (int)SportTypes.NumberGame => await service.GetNumberGameResult(request).ConfigureAwait(false),
                (int)SportTypes.Happy5 => await service.GetHappy5Result(request).ConfigureAwait(false),
                _ => throw new NotImplementedException()
            };
        }
    }
}