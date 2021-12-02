namespace NAP.SLI.Results.Requests
{
    using System;
    using System.Collections.Generic;
    using MediatR;
    using NAP.SLI.Results.Models;

    public class ResultLeagueByDateRequest : IRequest<IEnumerable<ResultLeagueByDateModel>>
    {
        public DateTime FromDate { get; set; }

        public int SportId { get; set; }
    }
}