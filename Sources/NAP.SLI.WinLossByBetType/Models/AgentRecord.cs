namespace NAP.SLI.WinLossByBetType.Models
{
    public class AgentRecord : RecordBase
    {
        public decimal MemberWinLoss { get; set; }

        public decimal AgentWinLoss { get; set; }

        public void Sum(AgentRecord t)
        {
            base.Sum(t);
            MemberWinLoss += t.MemberWinLoss;
            AgentWinLoss += t.AgentWinLoss;
        }
    }
}
