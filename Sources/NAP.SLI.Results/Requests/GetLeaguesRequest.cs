namespace NAP.SLI.Results.Requests
{
    using System;
    using System.Collections.Generic;
    using MediatR;
    using NAP.SLI.Results.Models;

    public class GetLeaguesRequest : IRequest<IEnumerable<LeagueModel>>
    {
        public DateTime EventDate { get; set; }

        public int SportType { get; set; }
    }
}