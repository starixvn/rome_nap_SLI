namespace NAP.SLI.Results.Utilities
{
    using System;
    using System.Collections.Generic;
    using System.Text;

    public static class Helper
    {
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
    }
}