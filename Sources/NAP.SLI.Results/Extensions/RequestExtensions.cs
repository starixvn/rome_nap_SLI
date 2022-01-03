namespace NAP.SLI.Results.Extensions
{
    using NAP.SLI.Common.Extensions;
    using NAP.SLI.Results.Requests;

    public static class RequestExtensions
    {
        public static string GetTitle(this ExcelRequest request)
        {
            return $"Results - {request.EventDate.ToDateString()} | {request.SportName} - {request.LeagueName}";
        }
    }
}