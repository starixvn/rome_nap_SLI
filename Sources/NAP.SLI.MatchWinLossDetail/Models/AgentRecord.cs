namespace NAP.SLI.MatchWinLossDetail.Models
{
    public class AgentRecord : IRecord
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

    public class AgentRecordEx : AgentRecord, IRecordEx<AgentRecordEx>
    {
        public string BetTypeName { get; set; }

        public decimal CompanyWinLoss { get; set; }

        public void Sum(AgentRecordEx t)
        {
            Turnover += t.Turnover;
            MemberWinLoss += t.MemberWinLoss;
            AgentWinLoss += t.AgentWinLoss;
            CompanyWinLoss += t.CompanyWinLoss;
        }
    }
}
