namespace NAP.SLI.Report.Models.WinLossAnalysis
{
    public class AgentAnalysisModel : AnalysisModel
    {
        public string SportType { get; set; }
        
        public string RollupKey { get; set; }

        public int BetCount { get; set; }

        public decimal Turnover { get; set; }

        public decimal MemberWinLoss { get; set; }

        public decimal AgentWinLoss { get; set; }
    }
}
