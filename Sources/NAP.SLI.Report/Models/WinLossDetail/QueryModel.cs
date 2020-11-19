namespace NAP.SLI.Report.Models.WinLossDetail
{
    using System.Collections.Generic;

    public class QueryModel<T>
    {
        public IEnumerable<T> Rows { get; set; }

        public T Total { get; set; }
    }
}
