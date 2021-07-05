using System.Collections.Generic;

namespace NAP.SLI.MatchWinLossDetail.Models
{
    public class MatchData<T> where T : new()
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
        }
    }

    public class Data<T> where T : IRecordEx<T>, new()
    {
        public IEnumerable<MatchData<T>> Matches { get; }

        public T Total { get; }

        public Data(IEnumerable<MatchData<T>> matches)
        {
            Matches = matches;
            Total = new T();
            foreach (var match in matches)
            {
                Total.Sum(match.Total);
            }
        }
    }

    public class AgentData : Data<AgentRecordEx>
    {
        public AgentData(IEnumerable<MatchData<AgentRecordEx>> matches)
        : base(matches)
        {
        }
    }

    public class MasterData : Data<MasterRecordEx>
    {
        public MasterData(IEnumerable<MatchData<MasterRecordEx>> matches)
        : base(matches)
        {
        }
    }

    public class SuperData : Data<SuperRecordEx>
    {
        public SuperData(IEnumerable<MatchData<SuperRecordEx>> matches)
        : base(matches)
        {
        }
    }
}