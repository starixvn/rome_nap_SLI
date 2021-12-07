namespace NAP.SLI.Results.Models
{
    using System;
    using System.Collections.Generic;
    using System.Runtime.Serialization;

    public interface IMatch
    {
        int MatchId { get; }

        string NoMatch { get; }

        int LeagueId { get; }

        string MatchCode { get; }

        DateTime KickOffTime { get; }

        string EventStatus { get; }

        [IgnoreDataMember]
        List<int> Seq { get; }

        [IgnoreDataMember]
        List<int> Ball { get; }
    }

    public class Match : IMatch
    {
        protected readonly Result result;

        public Match(Result result)
        {
            this.result = result;
            Seq = new() { result.Seq };
            Ball = new() { result.Number };
        }

        public int MatchId => result.MatchId;

        public string NoMatch => $"No {result.MatchCode}";

        public int LeagueId => result.LeagueId;

        public string MatchCode => result.MatchCode;

        public DateTime KickOffTime => result.KickOffTime;

        public string EventStatus => result.EventStatus;

        [IgnoreDataMember]
        public List<int> Seq { get; }

        [IgnoreDataMember]
        public List<int> Ball { get; }

    }
}