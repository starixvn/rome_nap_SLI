using System.Collections.Generic;

namespace NAP.SLI.MatchWinLossDetail.Models
{
    public class Data<T>
    {
        public IEnumerable<T> Records { get; set; }

        public NameData Names { get; set; }
    }

    public class AgentData : Data<AgentRecord>
    {
    }

    public class MasterData : Data<MasterRecord>
    {
    }

    public class SuperData : Data<SuperRecord>
    {
    }
}