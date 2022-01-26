namespace NAP.SLI.Results.Requests
{
    using System;
    using MediatR;

    public class QueryResultsByDateRequest : IRequest<object>
    {
        public DateTime EventDate { get; set; }

        public int LeagueId { get; set; }

        public int SportType { get; set; }
    }
}