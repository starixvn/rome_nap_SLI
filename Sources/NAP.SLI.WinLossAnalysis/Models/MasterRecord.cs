namespace NAP.SLI.WinLossAnalysis.Models
{
    public class MasterRecord : AgentRecord
    {
        public decimal MasterWinLoss { get; set; }
    }

    public class MasterRecordEx : MasterRecord, IRecordEx
    {
        public decimal CompanyWinLoss { get; set; }
    }
}
