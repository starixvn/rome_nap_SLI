namespace NAP.SimpleApi.Requests
{
    using Newtonsoft.Json.Linq;

    public class SimpleApiRequest
    {
        public string ApiKey { get; set; }

        public JObject Data { get; set; }
    }
}
