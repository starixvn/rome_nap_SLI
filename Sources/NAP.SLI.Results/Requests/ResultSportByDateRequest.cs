namespace NAP.SLI.Results.Requests
{
    using System;
    using System.Collections.Generic;
    using MediatR;
    using NAP.SLI.Results.Models;

    public class ResultSportByDateRequest : IRequest<IEnumerable<ResultSportByDateModel>>
    {
        public DateTime FromDate { get; set; }
    }
}