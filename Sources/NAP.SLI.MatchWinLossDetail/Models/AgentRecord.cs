namespace NAP.SLI.MatchWinLossDetail.Models
{
    public class AgentRecord
    {
        public int MatchId { get; set; }

        public int SportType { get; set; }

        public int HomeId { get; set; }

        public int AwayId { get; set; }

        public int LeagueId { get; set; }

        public int BetType { get; set; }

        public decimal Turnover { get; set; }

        public decimal MemberWinLoss { get; set; }

        public decimal AgentWinLoss { get; set; }
    }
}
