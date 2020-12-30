using System;

namespace NAP.SLI.Common.Extensions
{
    public static class DateTimeExtensions
    {
        public static string ToDateString(this DateTime dateTime) => dateTime.ToString("MM/dd/yyyy");
    }
}