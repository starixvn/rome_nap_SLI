namespace NAP.SLI.Results.Utilities
{
    using System;
    using System.Collections.Generic;
    using System.Globalization;
    using System.Linq;

    public static class Helper
    {
        private static readonly CultureInfo EnglishCultureInfo = new("en-US");

        public static void CheckArgument(string arg, string argName)
        {
            if (string.IsNullOrEmpty(arg))
            {
                throw new Exception($"{argName} can not be null or empty");
            }
        }

        public static string ConvertToQueryString(Dictionary<string, string> dictionary)
        {
            return string.Join("&", dictionary.Select(kvp => string.Format("{0}={1}", kvp.Key, kvp.Value)));
        }

        public static string FormatTwoDigit(int number)
        {
            return number.ToString("00");
        }

        public static string FormatFullDate(object dateValue, string formatPattern)
        {
            if (Convert.IsDBNull(dateValue) || dateValue == null)
            {
                return string.Empty;
            }

            return string.Format(EnglishCultureInfo, formatPattern, dateValue);
        }

        public static string Capitalize(string value)
        {
            var textInfo = EnglishCultureInfo.TextInfo;
            return textInfo.ToTitleCase(value);
        }
    }
}