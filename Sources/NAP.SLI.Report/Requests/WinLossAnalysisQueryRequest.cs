namespace NAP.SLI.Report.Requests
{
    using System;
    using MediatR;
    using NAP.SLI.Report.Models;

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
