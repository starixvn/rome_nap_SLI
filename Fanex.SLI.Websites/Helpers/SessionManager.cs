namespace Fanex.SLI.Websites.Helpers
{
    using System;
    using System.Web;

    public static class SessionManager
    {
        public static void Set<T>(string sessionKey, T value)
        {
            try
            {
                HttpContext.Current.Session[sessionKey] = value;
            }
            catch (IndexOutOfRangeException)
            {
            }
        }

        public static T Get<T>(string sessionKey)
        {
            try
            {
                T value = (T)HttpContext.Current.Session[sessionKey];
                return value;
            }
            catch (IndexOutOfRangeException)
            {
                return default(T);
            }
        }

        public static void Set(string sessionKey, object value)
        {
            Set<object>(sessionKey, value);
        }

        public static object Get(string sessionKey)
            => Get<object>(sessionKey);
    }
}
