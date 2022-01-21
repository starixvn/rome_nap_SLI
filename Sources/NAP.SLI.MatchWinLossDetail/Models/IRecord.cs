namespace NAP.SLI.MatchWinLossDetail.Models
{
    public interface IRecord
    {
        int MatchId { get; set; }

        string MatchCode { get; set; }

        int LeagueId { get; set; }

        int SportType { get; set; }

        int LiveIndicator { get; set; }

        int BetType { get; set; }
    }
}