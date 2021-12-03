namespace NAP.SLI.Results.Models
{
    using System.Collections.Generic;

    public class ResultRecordModel
    {
        public string LeagueName { get; set; }

        public IEnumerable<ResultModel> Matches { get; set; }
    }
}