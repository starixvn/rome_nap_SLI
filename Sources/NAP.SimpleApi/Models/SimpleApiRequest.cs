namespace NAP.SimpleApi.Models
{
    using Newtonsoft.Json.Linq;

    public class SimpleApiRequest
    {
        public string ApiKey { get; set; }

        public JObject Data { get; set; }
    }
}
