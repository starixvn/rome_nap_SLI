namespace NAP.SLI.WinLossByBetType.Models
{
    public class SuperRecord : RecordBase
    {
        public decimal MasterTotal { get; set; }

        public decimal SuperWinLoss { get; set; }
    }

    public class SuperRecordEx : SuperRecord, IRecordEx<SuperRecordEx>
    {
        public string BetTypeName { get; set; }

        public decimal CompanyWinLoss { get; set; }

        public void Sum(SuperRecordEx t)
        {
            base.Sum(t);
            MasterTotal += t.MasterTotal;
            SuperWinLoss += t.SuperWinLoss;
            CompanyWinLoss += t.CompanyWinLoss;
        }
    }
}
