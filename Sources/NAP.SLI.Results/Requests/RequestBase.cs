namespace NAP.SLI.Results.Requests
{
    using System;

    public class RequestBase
    {
        public DateTime EventDate { get; set; }

        public int LeagueId { get; set; }

        public int SportType { get; set; }
    }
}