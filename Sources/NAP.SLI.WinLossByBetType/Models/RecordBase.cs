namespace NAP.SLI.WinLossByBetType.Models
{
    public class RecordBase
    {
        public int SportType { get; set; }

        public int BetType { get; set; }

        public int LiveIndicator { get; set; }

        public int BetCount { get; set; }

        public decimal Turnover { get; set; }

        public void Sum(RecordBase t)
        {
            BetCount += t.BetCount;
            Turnover += t.Turnover;
        }
    }
}
