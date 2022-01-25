namespace NAP.SLI.Results.Requests
{
    using System;
    using MediatR;

    public class GetResultsByDateRequest : IRequest<object>
    {
        public DateTime EventDate { get; set; }

        public int LeagueId { get; set; }

        public int SportType { get; set; }
    }
}