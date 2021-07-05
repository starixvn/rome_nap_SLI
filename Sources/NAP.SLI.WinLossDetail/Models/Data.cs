using System.Collections.Generic;

namespace NAP.SLI.WinLossDetail.Models
{
    public class Data<T>
    {
        public IEnumerable<T> Records { get; set; }

        public T Total { get; set; }

        public int TotalRecords { get; set; }
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