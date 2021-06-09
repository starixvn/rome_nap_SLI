using System.Collections.Generic;

namespace NAP.SLI.MatchWinLossDetail.Models
{
    public class NameData
    {
        public IEnumerable<KeyValuePair<int, string>> SportTypes { get; set; }

        public IEnumerable<KeyValuePair<int, string>> Teams { get; set; }

        public IEnumerable<KeyValuePair<int, string>> Leagues { get; set; }

        public IEnumerable<KeyValuePair<int, string>> BetTypes { get; set; }
    }
}