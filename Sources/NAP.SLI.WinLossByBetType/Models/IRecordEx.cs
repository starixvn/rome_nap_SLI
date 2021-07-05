namespace NAP.SLI.WinLossByBetType.Models
{
    public interface IRecordEx<T>
    {
        string BetTypeName { get; set; }

        decimal CompanyWinLoss { get; set; }

        void Sum(T t);
    }
}