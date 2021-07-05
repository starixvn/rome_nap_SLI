namespace NAP.SLI.WinLossByBetType.Models
{
    public class MasterRecord : RecordBase
    {
        public decimal AgentTotal { get; set; }

        public decimal MasterWinLoss { get; set; }
    }

    public class MasterRecordEx : MasterRecord, IRecordEx<MasterRecordEx>
    {
        public string BetTypeName { get; set; }

        public decimal CompanyWinLoss { get; set; }

        public void Sum(MasterRecordEx t)
        {
            base.Sum(t);
            AgentTotal += t.AgentTotal;
            MasterWinLoss += t.MasterWinLoss;
            CompanyWinLoss += t.CompanyWinLoss;
        }
    }
}
