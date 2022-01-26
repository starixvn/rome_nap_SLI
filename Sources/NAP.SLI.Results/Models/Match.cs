namespace NAP.SLI.Results.Models
{
    using System;
    using System.Collections.Generic;
    using System.Runtime.Serialization;
    using NAP.SLI.Results.Utilities;

    public interface IMatch
    {
        int MatchId { get; }

        int LeagueId { get; }

        string MatchCode { get; }

        string KickOffTime { get; }

        string EventStatus { get; }

        [IgnoreDataMember]
        List<int> Seq { get; }

        [IgnoreDataMember]
        List<int> Ball { get; }
    }

    public class Match : IMatch
    {
        private const string DateTimeFormat = "{0:MM/dd/yyyy \\\n hh:mm:ss tt}";
        protected readonly ResultModel result;

        public Match(ResultModel result)
        {
            this.result = result;
            Seq = new() { result.Seq };
            Ball = new() { result.Number };
        }

        public int MatchId => result.MatchId;

        public int LeagueId => result.LeagueId;

        public string MatchCode => result.MatchCode;

        public string KickOffTime => GetFormatedKickOffTime(result.KickOffTime);

        public string EventStatus => Helper.Capitalize(result.EventStatus);

        [IgnoreDataMember]
        public List<int> Seq { get; }

        [IgnoreDataMember]
        public List<int> Ball { get; }

        private static string GetFormatedKickOffTime(DateTime kickOffTime)
            => Helper.FormatFullDate(kickOffTime, DateTimeFormat);
    }
}