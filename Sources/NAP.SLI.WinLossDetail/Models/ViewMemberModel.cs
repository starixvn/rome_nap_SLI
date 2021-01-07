namespace NAP.SLI.WinLossDetail.Models
{
    public class ViewMemberModel
    {
        public int CustId { get; set; }

        public string Username { get; set; }

        public decimal BetCount { get; set; }

        public decimal Turnover { get; set; }

        public decimal MemberWinLoss { get; set; }

        public decimal AgentWinLoss { get; set; }
    }
}
