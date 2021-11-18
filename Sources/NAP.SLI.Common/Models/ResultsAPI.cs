namespace NAP.SLI.Common.Models
{
    public class ResultsAPI
    {
        public string Url { get; set; }

        public string UrlSoccer5 { get; set; } = string.Empty;

        public string SiteId { get; set; } = null;

        public string VendorId { get; set; }

        public int DebugMode { get; set; } = 0;

        public string ProxyIPServer { get; set; } = string.Empty;

        public int ProxyPortServer { get; set; } = 0;
    }
}