namespace NAP.SLI.MatchWinLossDetail.Models
{
    public class MasterRecord : AgentRecord
    {
        public decimal MasterWinLoss { get; set; }
    }

    public class MasterRecord2 : MasterRecord, IBetTypeNameRecord
    {
        public string BetTypeName { get; set; }
    }
}
