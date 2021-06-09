namespace NAP.SLI.WinLossDetail.Requests
{
    using MediatR;

    public class QueryRequest : RequestBase, IRequest<object>
    {
        public int PageSize { get; set; }

        public int PageIndex { get; set; }
    }
}
