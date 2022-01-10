namespace NAP.SLI.Results.Utilities
{
    using System.Collections.Generic;

    public static class Language
    {
        private const string DefaultLanguage = "en-US";

        private static readonly Dictionary<string, string> SupportedLanguages = new()
        {
            { "en-US", "en" },
            { "zh-CN", "cs" },
            { "zh-TW", "ch" },
            { "zh-Hans", "zhcn" },
            { "th-TH", "th" },
            { "vi-VN", "vn" },
            { "id-ID", "id" }
        };

        public static string GetLanguageCode(string language)
            => string.IsNullOrEmpty(language) || !SupportedLanguages.ContainsKey(language)
                ? SupportedLanguages[DefaultLanguage]
                : SupportedLanguages[language];
    }
}