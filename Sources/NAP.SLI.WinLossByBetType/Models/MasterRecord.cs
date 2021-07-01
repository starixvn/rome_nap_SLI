namespace NAP.SLI.WinLossByBetType.Models
{
    public class MasterRecord : RecordBase
    {
        public decimal AgentTotal { get; set; }

        public decimal MasterWinLoss { get; set; }

        public void Sum(MasterRecord t)
        {
            base.Sum(t);
            AgentTotal += t.AgentTotal;
            MasterWinLoss += t.MasterWinLoss;
        }
    }
}
