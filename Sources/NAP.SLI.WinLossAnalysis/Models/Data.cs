namespace NAP.SLI.WinLossAnalysis.Models
{
    using System.Collections.Generic;

    public class Data<T>
    {
        public IEnumerable<T> Records { get; set; }

        public T Total { get; set; }
    }

    public class AgentData : Data<AgentRecordEx>
    {
    }

    public class MasterData : Data<MasterRecordEx>
    {
    }

    public class SuperData : Data<SuperRecordEx>
    {
    }
}
