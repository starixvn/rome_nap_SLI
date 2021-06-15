namespace NAP.SLI.MatchWinLossDetail.Models
{
    public class MasterRecord : AgentRecord
    {
        public decimal MasterWinLoss { get; set; }
    }

    public class MasterRecord2 : MasterRecord, IBetTypeNameRecord, ISumRecord<MasterRecord2>
    {
        public string BetTypeName { get; set; }

        public void Sum(MasterRecord2 t)
        {
            Turnover += t.Turnover;
            MemberWinLoss += t.MemberWinLoss;
            AgentWinLoss += t.AgentWinLoss;
            MasterWinLoss += t.MasterWinLoss;
        }
    }
}
