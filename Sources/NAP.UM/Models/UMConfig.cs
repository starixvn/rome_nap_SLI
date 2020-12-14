namespace NAP.UM.Models
{
    public class UMConfig
    {
        public string SecretKey { get; set; } = "9yBNYA5Fnv2V58+pKLvYpFwV5BMkIh9NNTxPQk6Sbss=";

        public string ServiceUri { get; set; }

        public int SiteId { get; set; }

        public bool Enabled { get; set; }

        public bool UnscheduleEnabled { get; set; }

        public string UnscheduleFrom { get; set; }

        public string UnscheduleTo { get; set; }

        public int CacheDuration { get; set; }
    }
}