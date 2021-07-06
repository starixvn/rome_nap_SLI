using NAP.SLI.Common.Extensions;
using NAP.SLI.WinLossDetail.Requests;

namespace NAP.SLI.WinLossDetail.Extensions
{
    public static class RequestExtensions
    {
        public static string GetTitle(this ExcelRequest request)
        {
            return $"Win Loss Detail {request.FromDate.ToDateString()} -> {request.ToDate.ToDateString()}";
        }
    }
}