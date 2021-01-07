namespace NAP.SLI.WinLossDetail.Requests
{
    using System;
    using MediatR;

    public class WinLossDetailQueryRequest : IRequest<object>
    {
        public int CustId { get; set; }

        public int RoleId { get; set; }

        public DateTime FromDate { get; set; }

        public DateTime ToDate { get; set; }

        public bool IsHistory { get; set; }

        public int PageSize { get; set; }

        public int PageIndex { get; set; }
    }
}
