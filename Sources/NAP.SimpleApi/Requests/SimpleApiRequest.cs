namespace NAP.SimpleApi.Requests
{
    using Newtonsoft.Json.Linq;
    using System.ComponentModel.DataAnnotations;

    public class SimpleApiRequest
    {
        [Required]
        public string ApiKey { get; set; }

        public JObject Data { get; set; }
    }
}
