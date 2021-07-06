using NAP.SLI.Common.Extensions;
using NAP.SLI.WinLossByBetType.Requests;

namespace NAP.SLI.WinLossByBetType.Extensions
{
    public static class RequestExtensions
    {
        public static string GetTitle(this ExcelRequest request)
        {
            return $"Win Loss By Bet Type {request.FromDate.ToDateString()} -> {request.ToDate.ToDateString()}";
        }
    }
}