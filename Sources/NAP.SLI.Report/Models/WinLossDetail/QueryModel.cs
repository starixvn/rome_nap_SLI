namespace NAP.SLI.Report.Models.WinLossDetail
{
    using System.Collections.Generic;

    public class QueryModel
    {
        public IEnumerable<object> Records { get; set; }

        public int TotalRecords { get; set; }
    }
}
