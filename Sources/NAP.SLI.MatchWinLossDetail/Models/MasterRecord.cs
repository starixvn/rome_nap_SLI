namespace NAP.SLI.MatchWinLossDetail.Models
{
    public class MasterRecord : AgentRecord
    {
        public decimal MasterWinLoss { get; set; }
    }

    public class MasterRecordEx : MasterRecord, IRecordEx<MasterRecordEx>
    {
        public string BetTypeName { get; set; }

        public decimal CompanyWinLoss { get; set; }

        public void Sum(MasterRecordEx t)
        {
            Turnover += t.Turnover;
            MemberWinLoss += t.MemberWinLoss;
            AgentWinLoss += t.AgentWinLoss;
            MasterWinLoss += t.MasterWinLoss;
            CompanyWinLoss += t.CompanyWinLoss;
        }
    }
}
