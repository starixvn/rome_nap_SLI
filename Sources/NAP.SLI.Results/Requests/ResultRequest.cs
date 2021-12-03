namespace NAP.SLI.Results.Requests
{
    using System;
    using System.Collections.Generic;
    using MediatR;
    using NAP.SLI.Results.Models;

    public class ResultRequest : IRequest<IEnumerable<ResultRecordModel>>
    {
        public DateTime FromDate { get; set; }

        public int LeagueId { get; set; }

        public int SportType { get; set; }
    }
}