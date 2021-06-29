namespace NAP.SLI.WinLossByBetType.Handlers
{
    using System;
    using System.Threading;
    using System.Threading.Tasks;
    using MediatR;
    using NAP.SLI.Common.Models;
    using NAP.SLI.WinLossByBetType.Requests;
    using NAP.SLI.WinLossByBetType.Services;

    public class QueryHandler : IRequestHandler<QueryRequest, object>
    {
        private readonly IQueryService service;

        public QueryHandler(IQueryService service)
        {
            this.service = service;
        }

        public async Task<object> Handle(QueryRequest request, CancellationToken cancellationToken)
        {
            return request.RoleId switch
            {
                (int)CustomerLevels.Super => await service.QuerySuper(request).ConfigureAwait(false),
                (int)CustomerLevels.Master => await service.QueryMaster(request).ConfigureAwait(false),
                (int)CustomerLevels.Agent => await service.QueryAgent(request).ConfigureAwait(false),
                _ => throw new NotImplementedException()
            };
        }
    }
}