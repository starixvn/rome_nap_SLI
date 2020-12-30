namespace NAP.SLI.Report.Requests
{
    using System;
    using MediatR;

    public class WinLossDetailExcelRequest : IRequest<byte[]>
    {
        public int CustId { get; set; }

        public int RoleId { get; set; }

        public DateTime FromDate { get; set; }

        public DateTime ToDate { get; set; }

        public bool IsHistory { get; set; }
    }
}
