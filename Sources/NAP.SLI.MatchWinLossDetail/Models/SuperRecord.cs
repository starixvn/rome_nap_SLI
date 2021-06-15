namespace NAP.SLI.MatchWinLossDetail.Models
{
    public class SuperRecord : MasterRecord
    {
        public decimal SuperWinLoss { get; set; }
    }

    public class SuperRecord2 : SuperRecord, IBetTypeNameRecord
    {
        public string BetTypeName { get; set; }
    }
}
