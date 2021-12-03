namespace NAP.SLI.Results.Models
{
    using System;
    using System.Collections.Generic;

    public class ResultModel
    {
        public ResultModel()
        {
            Seq = new List<int>();
            Ball = new List<int>();
            EventStatus = string.Empty;
            MatchCode = string.Empty;
        }

        public int LeagueId { get; set; }

        public string LeagueName { get; set; }

        public int MatchId { get; set; }

        public string MatchCode { get; set; }

        public DateTime EventDate { get; set; }

        public DateTime KickOffTime { get; set; }

        public string EventStatus { get; set; }

        public IList<int> Seq { get; set; }

        public IList<int> Ball { get; set; }
    }
}