using System.Collections.Generic;

namespace NAP.SLI.WinLossByBetType.Models
{
    public class Data<T> where T : IRecordEx<T>, new()
    {
        public IEnumerable<T> Records { get; }

        public T Total { get; }

        public Data(IEnumerable<T> records)
        {
            Records = records;
            Total = new T();
            foreach (var record in records)
            {
                Total.Sum(record);
            }
        }
    }

    public class AgentData : Data<AgentRecordEx>
    {
        public AgentData(IEnumerable<AgentRecordEx> records)
        : base(records)
        {
        }
    }

    public class MasterData : Data<MasterRecordEx>
    {
        public MasterData(IEnumerable<MasterRecordEx> records)
        : base(records)
        {
        }
    }

    public class SuperData : Data<SuperRecordEx>
    {
        public SuperData(IEnumerable<SuperRecordEx> records)
        : base(records)
        {
        }
    }
}