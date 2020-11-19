namespace NAP.SLI.Report.Requests
{
    using MediatR;
    using NAP.SLI.Report.Models.WinLossDetail;

    public class WinLossDetailQueryRequest : IRequest<QueryModel<object>>
    {
        public string Username { get; set; }
    }
}
