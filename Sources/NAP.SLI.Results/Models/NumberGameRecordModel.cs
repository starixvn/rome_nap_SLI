using System.Collections.Generic;

namespace NAP.SLI.Results.Models
{
    public class NumberGameRecordModel
    {
        public string LeagueName { get; set; }

        public IEnumerable<NumberGameModel> Matches { get; set; }
    }
}