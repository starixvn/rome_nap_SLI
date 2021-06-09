namespace NAP.SLI.WinLossAnalysis.Models
{
    using System.Collections.Generic;

    public class Data<T>
    {
        public IEnumerable<T> Records { get; set; }

        public T Total { get; set; }
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
