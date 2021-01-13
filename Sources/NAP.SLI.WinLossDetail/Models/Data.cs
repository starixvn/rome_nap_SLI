using System.Collections.Generic;

namespace NAP.SLI.WinLossDetail.Models
{
    public class Data<T>
    {
        public IEnumerable<T> Records { get; set; }

        public T Total { get; set; }

        public int TotalRecords { get; set; }
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