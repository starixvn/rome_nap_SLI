namespace NAP.SLI.WinLossAnalysis.Requests
{
    using System;
    using MediatR;
    using NAP.SLI.Common.Extensions;

    public class WinLossAnalysisExcelRequest : IRequest<byte[]>
    {
        public int CustId { get; set; }

        public string Username { get; set; }

        public int RoleId { get; set; }

        public DateTime FromDate { get; set; }

        public DateTime ToDate { get; set; }

        public bool IsHistory { get; set; }

        public int ReportType { get; set; }

        public string GetDownloadFileName() => $"{string.Join("-", "Win Loss Analysis", Username, FromDate.ToDateString(), ToDate.ToDateString())}.xls";

        public string GetExcelTitle() => $"Win Loss Analysis {FromDate.ToDateString()} {ToDate.ToDateString()}";
    }
}
