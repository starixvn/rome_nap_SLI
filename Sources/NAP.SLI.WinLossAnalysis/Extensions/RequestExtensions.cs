using NAP.SLI.Common.Extensions;
using NAP.SLI.WinLossAnalysis.Models;
using NAP.SLI.WinLossAnalysis.Requests;

namespace NAP.SLI.WinLossAnalysis.Extensions
{
    public static class RequestExtensions
    {
        public static string GetReportName(this RequestBase request)
        {
            return (ReportTypes)request.ReportType switch
            {
                ReportTypes.Daily => "Daily",
                ReportTypes.Monthly => "Monthly",
                ReportTypes.Sport => "Sport",
                _ => string.Empty
            };
        }

        public static string GetTitle(this ExcelRequest request)
        {
            return $"Win Loss Analysis {request.FromDate.ToDateString()} -> {request.ToDate.ToDateString()}";
        }
    }
}