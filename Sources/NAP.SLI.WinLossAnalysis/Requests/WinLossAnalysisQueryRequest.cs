namespace NAP.SLI.WinLossAnalysis.Requests
{
    using System;
    using MediatR;
    using NAP.SLI.WinLossAnalysis.Models;

    public class WinLossAnalysisQueryRequest : IRequest<QueryModel>
    {
        public int CustId { get; set; }

        public int RoleId { get; set; }

        public DateTime FromDate { get; set; }

        public DateTime ToDate { get; set; }

        public int ReportType { get; set; }

        public int PageSize { get; set; }

        public int PageIndex { get; set; }
    }
}
