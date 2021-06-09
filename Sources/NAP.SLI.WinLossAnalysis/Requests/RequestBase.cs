namespace NAP.SLI.WinLossAnalysis.Requests
{
    using System;

    public class RequestBase
    {
        public int CustId { get; set; }

        public int RoleId { get; set; }

        public DateTime FromDate { get; set; }

        public DateTime ToDate { get; set; }

        public int ReportType { get; set; }
    }
}
