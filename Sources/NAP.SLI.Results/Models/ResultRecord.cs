namespace NAP.SLI.Results.Models
{
    using System.Collections.Generic;

    public class ResultRecord<T> where T : IMatch
    {
        public string LeagueName { get; set; }

        public IEnumerable<T> Matches { get; set; }
    }
}