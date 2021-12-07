namespace NAP.SLI.Results.Requests
{
    using System;
    using MediatR;

    public class ResultRequest : IRequest<object>
    {
        public DateTime FromDate { get; set; }

        public int LeagueId { get; set; }

        public int SportType { get; set; }
    }
}