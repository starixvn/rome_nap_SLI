namespace NAP.SimpleApi.Helpers
{
    using Fanex.Data.Repository;
    using Newtonsoft.Json.Linq;
    using System;

    public static class ObjectHelper
    {
        public static void CopyProperties(JObject src, ICriteria dest)
        {
            var destProperties = dest.GetType().GetProperties();
            foreach(var destProperty in destProperties)
            {
                if (destProperty.CanWrite && src.TryGetValue(destProperty.Name, StringComparison.InvariantCultureIgnoreCase, out JToken value))
                {
                    destProperty.SetValue(dest, value.ToObject(destProperty.PropertyType));
                }
            }
        }
    }
}
