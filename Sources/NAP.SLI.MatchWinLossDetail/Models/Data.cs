using System.Collections.Generic;

namespace NAP.SLI.MatchWinLossDetail.Models
{
    public class MatchData<T> where T : IRecordEx<T>, new()
    {
        public string LeagueName { get; }

        public string MatchName { get; }

        public IEnumerable<T> Records { get; }

        public T Total { get; }

        public MatchData(string leagueName, string matchName, IEnumerable<T> records)
        {
            LeagueName = leagueName;
            MatchName = matchName;
            Records = records;
            Total = new T();
            foreach (var record in Records)
            {
                Total.Sum(record);
            }
        }
    }

    public class Data<T> where T : IRecordEx<T>, new()
    {
        public IEnumerable<MatchData<T>> Matches { get; }

        public T Total { get; }

        public T GrandTotal { get; }

        public IEnumerable<T> Happy5LinkedGames { get; }

        public Data(IEnumerable<MatchData<T>> matches, IEnumerable<T> happy5LinkedGames)
        {
            Matches = matches;
            Happy5LinkedGames = happy5LinkedGames;
            Total = new T();
            foreach (var match in matches)
            {
                Total.Sum(match.Total);
            }
            GrandTotal = new T();
            GrandTotal.Sum(Total);
            foreach (var happy5LinkedGame in happy5LinkedGames)
            {
                GrandTotal.Sum(happy5LinkedGame);
            }
        }
    }

    public class AgentData : Data<AgentRecordEx>
    {
        public AgentData(IEnumerable<MatchData<AgentRecordEx>> matches, IEnumerable<AgentRecordEx> happy5LinkedGames)
        : base(matches, happy5LinkedGames)
        {
        }
    }

    public class MasterData : Data<MasterRecordEx>
    {
        public MasterData(IEnumerable<MatchData<MasterRecordEx>> matches, IEnumerable<MasterRecordEx> happy5LinkedGames)
        : base(matches, happy5LinkedGames)
        {
        }
    }

    public class SuperData : Data<SuperRecordEx>
    {
        public SuperData(IEnumerable<MatchData<SuperRecordEx>> matches, IEnumerable<SuperRecordEx> happy5LinkedGames)
        : base(matches, happy5LinkedGames)
        {
        }
    }
}