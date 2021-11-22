using System;

namespace NAP.SLI.Common.Models
{
    public class ConfigurationModel
    {
        public string Environment { get; set; }

        public string FrontEndSentryDsn { get; set; }

        public DateTime BalanceUpDay { get; set; }
    }
}