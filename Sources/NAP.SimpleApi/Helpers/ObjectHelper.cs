namespace NAP.SimpleApi.Helpers
{
    using Fanex.Data.Repository;
    using Microsoft.AspNetCore.Http;
    using Newtonsoft.Json.Linq;
    using System;
    using System.ComponentModel;

    public static class ObjectHelper
    {
        public static void CopyProperties(JObject src, ICriteria dest)
        {
            var destProperties = dest.GetType().GetProperties();
            foreach (var destProperty in destProperties)
            {
                if (destProperty.CanWrite && src.TryGetValue(destProperty.Name, StringComparison.InvariantCultureIgnoreCase, out JToken value))
                {
                    destProperty.SetValue(dest, value.ToObject(destProperty.PropertyType));
                }
            }
        }

        public static void CopyProperties(IQueryCollection queryCollection, ICriteria dest)
        {
            var destProperties = dest.GetType().GetProperties();
            foreach (var destProperty in destProperties)
            {
                if (destProperty.CanWrite && queryCollection.TryGetValue(destProperty.Name, out var value))
                {

                    var converter = TypeDescriptor.GetConverter(destProperty.PropertyType);
                    var convertedObject = converter.ConvertFromString(value);
                    destProperty.SetValue(dest, convertedObject);
                }
            }
        }
    }
}
