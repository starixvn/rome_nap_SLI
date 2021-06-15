namespace NAP.SLI.MatchWinLossDetail.Models
{
    public class SuperRecord : MasterRecord
    {
        public decimal SuperWinLoss { get; set; }
    }

    public class SuperRecord2 : SuperRecord, IBetTypeNameRecord, ISumRecord<SuperRecord2>
    {
        public string BetTypeName { get; set; }

        public void Sum(SuperRecord2 t)
        {
            Turnover += t.Turnover;
            MemberWinLoss += t.MemberWinLoss;
            AgentWinLoss += t.AgentWinLoss;
            MasterWinLoss += t.MasterWinLoss;
            SuperWinLoss += t.SuperWinLoss;
        }
    }
}
