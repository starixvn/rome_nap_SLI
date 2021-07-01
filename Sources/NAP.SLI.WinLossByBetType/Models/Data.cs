using System.Collections.Generic;

namespace NAP.SLI.WinLossByBetType.Models
{
    public class Data<T> where T : RecordBase, new()
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

    public class AgentData : Data<AgentRecord>
    {
        public AgentData(IEnumerable<AgentRecord> records)
        : base(records)
        {
        }
    }

    public class MasterData : Data<MasterRecord>
    {
        public MasterData(IEnumerable<MasterRecord> records)
        : base(records)
        {
        }
    }

    public class SuperData : Data<SuperRecord>
    {
        public SuperData(IEnumerable<SuperRecord> records)
        : base(records)
        {
        }
    }
}