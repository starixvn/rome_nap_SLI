using System.Collections.Generic;

namespace NAP.SLI.MatchWinLossDetail.Models
{
    public class Data<T>
    {
        public string LeagueName { get; set; }

        public string MatchName { get; set; }

        public IEnumerable<T> Records { get; set; }
    }

    public class AgentData
    {
        public IEnumerable<Data<AgentRecord2>> Data { get; set; }
    }

    public class MasterData
    {
        public IEnumerable<Data<MasterRecord2>> Data { get; set; }
    }

    public class SuperData
    {
        public IEnumerable<Data<SuperRecord2>> Data { get; set; }
    }
}