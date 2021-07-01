namespace NAP.SLI.WinLossByBetType.Models
{
    public class SuperRecord : RecordBase
    {
        public decimal MasterTotal { get; set; }

        public decimal SuperWinLoss { get; set; }

        public void Sum(SuperRecord t)
        {
            base.Sum(t);
            MasterTotal += t.MasterTotal;
            SuperWinLoss += t.SuperWinLoss;
        }
    }
}
