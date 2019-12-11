namespace Fanex.SLI.Configurations
{
    using System.Configuration;

    public static class AppSettings
    {
        private static string serverTimezone;

        public static string ServerTimezone
        {
            get
            {
                if (serverTimezone == null)
                {
                    serverTimezone = GetValue("ServerTimezone");
                }

                return serverTimezone;
            }
        }

        private static string GetValue(string key)
        {
            return ConfigurationManager.AppSettings[key];
        }
    }
}
