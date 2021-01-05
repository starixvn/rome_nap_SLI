namespace NAP.SLI.Report.Requests
{
    using System;
    using MediatR;
    using NAP.SLI.Common.Extensions;

    public class WinLossDetailExcelRequest : IRequest<byte[]>
    {
        public int CustId { get; set; }

        public string Username { get; set; }

        public int RoleId { get; set; }

        public DateTime FromDate { get; set; }

        public DateTime ToDate { get; set; }

        public bool IsHistory { get; set; }

        public string GetDownloadFileName() => string.Join("-", "Win Loss Detail", Username, FromDate.ToDateString(), ToDate.ToDateString());
    }
}
