namespace NAP.SLI.Results.Models
{
    using System;

    public class Result
    {
        public int LeagueId { get; set; }

        public int MatchId { get; set; }

        public string MatchCode { get; set; }

        public DateTime EventDate { get; set; }

        public DateTime KickOffTime { get; set; }

        public string EventStatus { get; set; }

        public int Seq { get; set; }

        public int Number { get; set; }
    }
}