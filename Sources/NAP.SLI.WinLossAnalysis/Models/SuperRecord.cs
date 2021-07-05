namespace NAP.SLI.WinLossAnalysis.Models
{
    public class SuperRecord : MasterRecord
    {
        public decimal SuperWinLoss { get; set; }
    }

    public class SuperRecordEx : SuperRecord, IRecordEx
    {
        public decimal CompanyWinLoss { get; set; }
    }
}
