using System;

namespace NAP.SLI.Common.Extensions
{
    public static class DateTimeExtensions
    {
        public static string ToDateString(this DateTime value) => value.ToString("MM/dd/yyyy");
    }
}