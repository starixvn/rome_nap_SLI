namespace NAP.SLI.Report.Models.WinLossDetail
{
    public class ViewAgentModel
    {
        public int CustId { get; set; }

        public string Username { get; set; }

        public decimal BetCount { get; set; }

        public decimal Turnover { get; set; }

        public decimal MemberWinLoss { get; set; }

        public decimal AgentWinLoss { get; set; }
    }
}
