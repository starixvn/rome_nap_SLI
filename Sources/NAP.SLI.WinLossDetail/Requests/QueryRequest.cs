namespace NAP.SLI.WinLossDetail.Requests
{
    using System.ComponentModel.DataAnnotations;
    using MediatR;

    public class QueryRequest : RequestBase, IRequest<object>
    {
        [Required]
        public int PageSize { get; set; }

        [Required]
        public int PageIndex { get; set; }
    }
}
