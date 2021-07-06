using NAP.SLI.Common.Extensions;
using NAP.SLI.MatchWinLossDetail.Requests;

namespace NAP.SLI.MatchWinLossDetail.Extensions
{
    public static class RequestExtensions
    {
        public static string GetTitle(this ExcelRequest request)
        {
            return $"Match Win Loss Detail {request.FromDate.ToDateString()} -> {request.ToDate.ToDateString()}";
        }
    }
}