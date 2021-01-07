namespace NAP.SLI.WinLossAnalysis.Models
{
    using System.Collections.Generic;

    public class QueryModel
    {
        public IEnumerable<object> Records { get; set; }

        public object Total { get; set; }

        public int TotalRecords { get; set; }
    }
}
