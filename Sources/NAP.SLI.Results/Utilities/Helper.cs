namespace NAP.SLI.Results.Utilities
{
    using System;
    using System.Collections.Generic;
    using System.Globalization;
    using System.Text;

    public static class Helper
    {
        private static readonly CultureInfo Cult = new("en-US");

        public static void CheckArgument(string arg, string argName)
        {
            if (string.IsNullOrEmpty(arg))
            {
                throw new Exception($"{argName} can not be null or empty");
            }
        }

        public static string DictionaryToString(Dictionary<string, string> dictionary)
        {
            var dictionaryString = new StringBuilder();

            foreach (KeyValuePair<string, string> keyValues in dictionary)
            {
                dictionaryString.Append($"{keyValues.Key}={keyValues.Value}&");
            }

            return dictionaryString.ToString();
        }

        public static string FormatTwoDigit(int number)
        {
            return number.ToString("00");
        }

        public static string FullDateFormat(object dateValue, string formatPattern)
        {
            if (Convert.IsDBNull(dateValue) || dateValue == null)
            {
                return string.Empty;
            }

            return string.Format(Cult, formatPattern, dateValue);
        }

        public static string Capitalize(string value)
        {
            var textInfo = Cult.TextInfo;
            return textInfo.ToTitleCase(value);
        }
    }
}