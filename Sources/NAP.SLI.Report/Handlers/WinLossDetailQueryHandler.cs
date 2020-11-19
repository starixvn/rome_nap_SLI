namespace NAP.SLI.Report.Handlers
{
    using System.Threading;
    using System.Threading.Tasks;
    using MediatR;
    using NAP.SLI.Report.Models.WinLossDetail;
    using NAP.SLI.Report.Requests;

    public class WinLossDetailQueryHandler : IRequestHandler<WinLossDetailQueryRequest, QueryModel<object>>
    {
        public Task<QueryModel<object>> Handle(WinLossDetailQueryRequest request, CancellationToken cancellationToken)
        {
            throw new System.NotImplementedException();
        }
    }
}
