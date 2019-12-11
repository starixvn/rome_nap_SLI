namespace Fanex.SLI.Extensions
{
    using System;

    public static class DateTimeExtensions
    {
        private const string ShortDateFormat = "{0:MM/dd/yyyy}";
        private const string FullDateTimeFormat = "{0:MM/dd/yyyy h:mm:ss tt}";

        public static string ToShortFormatedDate(this DateTime value)
        {
            return string.Format(ShortDateFormat, value);
        }

        public static string ToShortFormatedDate(this DateTime? value)
        {
            return value.HasValue ? string.Format(ShortDateFormat, value) : string.Empty;
        }

        public static string ToFullFormatedDate(this DateTime value)
        {
            return string.Format(FullDateTimeFormat, value);
        }

        public static string ToFullFormatedDate(this DateTime? value)
        {
            return value.HasValue ? string.Format(FullDateTimeFormat, value) : string.Empty;
        }

        public static DateTime FirstDayOfMonth(this DateTime dateTime)
        {
            return new DateTime(dateTime.Year, dateTime.Month, 1);
        }

        public static DateTime LastDayOfMonth(this DateTime dateTime)
        {
            return dateTime.FirstDayOfMonth().AddMonths(1).AddDays(-1);
        }

        public static DateTime StartDayOfWeek(this DateTime dt, DayOfWeek startDateOfWeek = 0)
        {
            int diff = (7 + (dt.DayOfWeek - startDateOfWeek)) % 7;
            return dt.AddDays(-1 * diff).Date;
        }

        public static DateTime LastDayOfWeek(this DateTime dt, DayOfWeek startDateOfWeek = 0)
        {
            int diff = (7 + (dt.DayOfWeek - startDateOfWeek)) % 7;
            return dt.AddDays(-1 * diff + 6).Date;
        }
    }
}
