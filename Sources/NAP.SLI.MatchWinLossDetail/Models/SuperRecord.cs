namespace NAP.SLI.MatchWinLossDetail.Models
{
    public class SuperRecord : MasterRecord
    {
        public decimal SuperWinLoss { get; set; }
    }

    public class SuperRecordEx : SuperRecord, IRecordEx<SuperRecordEx>
    {
        public string BetTypeName { get; set; }

        public decimal CompanyWinLoss { get; set; }

        public void Sum(SuperRecordEx t)
        {
            Turnover += t.Turnover;
            MemberWinLoss += t.MemberWinLoss;
            AgentWinLoss += t.AgentWinLoss;
            MasterWinLoss += t.MasterWinLoss;
            SuperWinLoss += t.SuperWinLoss;
            CompanyWinLoss += t.CompanyWinLoss;
        }
    }
}
