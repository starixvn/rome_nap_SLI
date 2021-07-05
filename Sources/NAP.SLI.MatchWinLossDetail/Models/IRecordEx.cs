namespace NAP.SLI.MatchWinLossDetail.Models
{
    public interface IRecordEx<T>
    {
        string BetTypeName { get; set; }

        decimal CompanyWinLoss { get; set; }

        void Sum(T t);
    }
}