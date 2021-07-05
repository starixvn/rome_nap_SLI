namespace NAP.SLI.WinLossDetail.Models
{
    public class AgentRecord
    {
        public int CustId { get; set; }

        public string Username { get; set; }

        public decimal BetCount { get; set; }

        public decimal Turnover { get; set; }

        public decimal MemberWinLoss { get; set; }

        public decimal AgentWinLoss { get; set; }
    }

    public class AgentRecordEx : AgentRecord, IRecordEx
    {
        public decimal CompanyWinLoss { get; set; }
    }
}
