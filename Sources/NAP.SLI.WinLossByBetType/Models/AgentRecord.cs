namespace NAP.SLI.WinLossByBetType.Models
{
    public class AgentRecord : RecordBase
    {
        public decimal MemberWinLoss { get; set; }

        public decimal AgentWinLoss { get; set; }
    }

    public class AgentRecordEx : AgentRecord, IRecordEx<AgentRecordEx>
    {
        public string BetTypeName { get; set; }

        public decimal CompanyWinLoss { get; set; }

        public void Sum(AgentRecordEx t)
        {
            base.Sum(t);
            MemberWinLoss += t.MemberWinLoss;
            AgentWinLoss += t.AgentWinLoss;
            CompanyWinLoss += t.CompanyWinLoss;
        }
    }
}
